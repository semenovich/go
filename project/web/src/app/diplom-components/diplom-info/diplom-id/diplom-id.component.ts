import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DiplomService} from '../../../common/services/diplom.service';
import {DiplomModel} from '../../../common/models/diplom.model';
import {zip} from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-diplom-id',
  templateUrl: './diplom-id.component.html',
  styleUrls: ['./diplom-id.component.scss']
})
export class DiplomIdComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private diplomService: DiplomService
  ) {
  }

  diplomId: number;
  pm = '';
  normcontroller = '';
  reviewer = '';
  chairman = '';
  diplomOrder = '';
  specialty = '';
  commission = '';
  diplom = new DiplomModel();
  subscribeTimer: any;
  timeLeft = 20;
  timeEnd = 20;
  timerText: string;
  color = '#212529';
  timer = false;
  interval;
  checkInterval;
  time = 10;

  ngOnInit(): void {
    this.diplomId = this.route.snapshot.params.id;
    this.getDiplom();
    this.startTimer();
  }

  ngOnDestroy() {
    this.diplom.Time = 0;
    this.updateDiplom(this.diplom);
    clearInterval(this.interval);
    clearInterval(this.checkInterval);
  }

  getDiplom() {
    this.diplomService.getDiplomById(this.diplomId).subscribe(res => {
      if (res) {
        this.diplom = res;
        if (this.diplom.Time !== 0) {
          this.timeLeft = this.diplom.Time;
          this.start();
        }
        this.getDiplomInfo(res);
      }
    });
  }

  getDiplomInfo(diplom: DiplomModel) {
    zip(
      this.getPmList(),
      this.getNormcontrollerList(),
      this.getReviewerList(),
      this.getChairmanList(),
      this.getDiplomorderList(),
      this.getSpecialtyList(),
      this.getCommissionList(),
    ).subscribe(([pm, normcontroller, reviewer, chairman, diplomorder, specialty, commission]) => {
      this.pm = pm.find(el => el.Id === diplom.PmId).Fio;
      this.normcontroller = normcontroller.find(el => el.Id === diplom.NormcontrollerId).Fio;
      this.reviewer = reviewer.find(el => el.Id === diplom.ReviewerId).Fio;
      this.chairman = chairman.find(el => el.Id === diplom.ChairmanId).Fio;
      const diplomOrderModel = diplomorder.find(el => el.Id === diplom.DiplomorderId);
      this.diplomOrder = `${diplomOrderModel.Name} ${this.strToDate(diplomOrderModel.Dateorder)}`;
      this.specialty = specialty.find(el => el.Id === diplom.SpecialtyId).Name;
      this.commission = commission.find(el => el.Id === diplom.CommissionId).Fio;
    });
  }

  private getPmList() {
    return this.diplomService.getPms();
  }

  private getNormcontrollerList() {
    return this.diplomService.getNormcontrollers();
  }

  private getReviewerList() {
    return this.diplomService.getReviewers();
  }

  private getChairmanList() {
    return this.diplomService.getChairmans();
  }

  private getDiplomorderList() {
    return this.diplomService.getDiplomorders();
  }

  private getSpecialtyList() {
    return this.diplomService.getSpecialtys();
  }

  private getCommissionList() {
    return this.diplomService.getCommissions();
  }

  private updateDiplom(diplom: DiplomModel) {
    if (this.timer) {
      this.diplomService.updateDiplom(diplom).subscribe(res => {});
    }
  }

  onMain() {
    this.router.navigate(['/']);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = false;
    this.diplom.Time = 0;
    this.updateDiplom(this.diplom);
    this.timerText = '';
    this.color = '#212529';
    this.timer = false;
  }

  start() {
    this.timeLeft = this.time * 60;
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.diplom.Time = this.timeLeft;
        this.timer = true;
        this.updateDiplom(this.diplom);
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.timerText = this.secToMin(this.timeLeft.toString());
        } else {
          this.timeLeft--;
          this.color = 'red';
          this.timerText = this.secToMin((this.timeLeft * -1).toString());
        }
      }, 1000);
    }
  }

  startTimer() {
    this.checkInterval = setInterval(() => {
      this.diplomService.getDiplomById(this.diplomId).subscribe(res => {
        if (res.Time !== 0) {
          clearInterval(this.checkInterval);
          this.start();
        }
      });
    }, 2000);
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
