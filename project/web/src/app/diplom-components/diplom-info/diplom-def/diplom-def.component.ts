import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DiplomService} from '../../../common/services/diplom.service';
import {DiplomModel} from '../../../common/models/diplom.model';

@Component({
  selector: 'app-diplom-def',
  templateUrl: './diplom-def.component.html',
  styleUrls: ['./diplom-def.component.scss']
})
export class DiplomDefComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private diplomService: DiplomService
  ) {
  }
  Fio = '';
  Topic = '';
  pm = '';
  normcontroller = '';
  reviewer = '';
  chairman = '';
  diplomOrder = '';
  commission = '';
  diplom = new DiplomModel();
  timerText: string;
  color = '#212529';
  interval;
  checkInterval;
  id: number;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    clearInterval(this.checkInterval);
  }

  onMain() {
    this.router.navigate(['/']);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.diplomService.getAllDiploms().subscribe(res => {
        if (res) {
          res.forEach(el => {
            if (el.Time) {
              this.id = el.Id;
              this.startSecTimer(el.Id);
              clearInterval(this.interval);
              return;
            }
          });
        }
      });
    }, 2000);
  }

  startSecTimer(id: number) {
    this.checkInterval = setInterval(() => {
      this.diplomService.getDiplomById(this.id).subscribe(el => {
        if (el.Time) {
          this.Topic = el.Topic;
          this.Fio = el.Fio;
          this.timerText = this.secToMin(el.Time.toString());
        } else {
          this.id = 0;
          this.Topic = '';
          this.Fio = '';
          this.timerText = '';
          clearInterval(this.checkInterval);
          this.startTimer();
        }
      });
    }, 1000);
  }

  secToMin(sec: string) {
    const min = Math.floor(+sec / 60);
    let seconds = (+sec - min * 60).toString();
    if (+seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${min}:${seconds}`;
  }

  strToDate(str: string) {
    const date = new Date(str);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
  }
}
