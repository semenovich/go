import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {DiplomService} from '../../common/services/diplom.service';
import {DiplomModel} from '../../common/models/diplom.model';
import {Observable, zip} from 'rxjs';
import {DiplomDataService} from '../../common/services/diplom-data.service';
import {DiplomInfoModel} from '../../common/models/diplomInfo.model';
import {SpecialytyModel} from '../../common/models/specialyty.model';

@Component({
  selector: 'app-diplom',
  templateUrl: './diplom.component.html',
  styleUrls: ['./diplom.component.scss']
})
export class DiplomComponent implements OnInit, DoCheck {

  isDiplomSelect = false;
  selectDiplomId: number;
  diplomsList: DiplomModel[];
  infoAboutDiplom: DiplomInfoModel;
  load = true;

  constructor(
    private diplomService: DiplomService,
    private diplomDataService: DiplomDataService,
  ) {
  }

  ngOnInit() {
    const filter = localStorage.getItem('filter');
    if (filter) {
      this.getDiplomsListAndFilter();
    } else {
      this.getDiplomsList();
    }
    zip(
      this.getPmList(),
      this.getNormcontrollerList(),
      this.getReviewerList(),
      this.getChairmanList(),
      this.getDiplomorderList(),
      this.getSpecialtyList(),
      this.getCommissionList(),
    ).subscribe(([pm, normcontroller, reviewer, chairman, diplomorder, specialty, commission]) => {
      this.infoAboutDiplom = {
        pmList: pm,
        normcontrollerList: normcontroller,
        reviewerList: reviewer,
        chairmanList: chairman,
        diplomorderList: diplomorder,
        specialtyList: specialty,
        commissionList: commission,
      };
      this.load = false;
    });
  }

  ngDoCheck() {
    this.selectDiplomId = this.diplomDataService.selectDiplomId;
    this.isDiplomSelect = this.diplomDataService.isDiplomSelect;
    if (this.diplomDataService.isDiplomsUpdate) {
      if (this.diplomDataService.diplomsFilter) {
        this.getDiplomsListAndFilter();
      } else {
        this.getDiplomsList();
      }
    }
    if (this.diplomDataService.diplomsFilter) {
      this.getDiplomsListAndFilter();
    }
    if (this.diplomDataService.changePm) {
      this.getPmList().subscribe(res => {
        this.infoAboutDiplom.pmList = res;
        this.diplomDataService.changePm = false;
      });
    }
    if (this.diplomDataService.changeReviewer) {
      this.getReviewerList().subscribe(res => {
        this.infoAboutDiplom.reviewerList = res;
        this.diplomDataService.changeReviewer = false;
      });
    }
    if (this.diplomDataService.changeChairman) {
      this.getChairmanList().subscribe(res => {
        this.infoAboutDiplom.chairmanList = res;
        this.diplomDataService.changeChairman = false;
      });
    }
    if (this.diplomDataService.changeNormoconntroller) {
      this.getNormcontrollerList().subscribe(res => {
        this.infoAboutDiplom.normcontrollerList = res;
        this.diplomDataService.changeNormoconntroller = false;
      });
    }
    if (this.diplomDataService.changeOrder) {
      this.getDiplomorderList().subscribe(res => {
        this.infoAboutDiplom.diplomorderList = res;
        this.diplomDataService.changeOrder = false;
      });
    }
    if (this.diplomDataService.changeCommission) {
      this.getCommissionList().subscribe(res => {
        this.infoAboutDiplom.commissionList = res;
        this.diplomDataService.changeCommission = false;
      });
    }
    if (this.diplomDataService.changeSpecialty) {
      this.getSpecialtyList().subscribe(res => {
        this.infoAboutDiplom.specialtyList = res;
        this.diplomDataService.changeSpecialty = false;
      });
    }
    this.diplomDataService.diploms = this.diplomsList;
  }

  private getDiplomsList() {
    const filter = localStorage.getItem('filter');
    if (filter) {
      this.getDiplomsListAndFilter();
      // this.diplomDataService.isDiplomsUpdate = false;
    } else {
      this.diplomService.getAllDiploms().subscribe(res => {
        this.diplomsList = res;
        this.diplomDataService.isDiplomsUpdate = false;
      });
    }
  }

  private getDiplomsListAndFilter() {
    this.diplomService.getAllDiploms().subscribe(res => {
      const filter = JSON.parse(localStorage.getItem('filter'));
      Object.keys(filter).forEach(key => {
        if (+/\d+/.exec(filter[key]) && key !== 'Execution' && key !== 'Deadline') {
          filter[key] = +filter[key];
        }
        res = res.filter(el => {
          if (key === 'Execution' || key === 'Deadline') {
            if (this.checkDate(filter[key], el[key])) {
              return el;
            }
          }
          if (key === 'Fio' && el[key].toLowerCase().includes(filter[key].toLowerCase())) {
            return el;
          }
          if (key === 'Topic' && el[key].toLowerCase().includes(filter[key].toLowerCase())) {
            return el;
          }
          return el[key] === filter[key];
        });
      });
      this.diplomsList = res;
      this.diplomDataService.diplomsFilter = false;
    });
  }

  private checkDate(filter, el) {
    const day = (+filter.substring(8, 10) + 1) < 10 ? `0${+filter.substring(8, 10) + 1}` : (+filter.substring(8, 10) + 1).toString();
    return filter.substring(0, 4) === el.substring(0, 4) && filter.substring(5, 7) === el.substring(5, 7) && day === el.substring(8, 10);
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

  private getSpecialtyList(): Observable<SpecialytyModel[]> {
    return this.diplomService.getSpecialtys();
  }

  private getCommissionList() {
    return this.diplomService.getCommissions();
  }
}
