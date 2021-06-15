import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DiplomDataService {
  selectDiplomId: number;
  isDiplomSelect = false;
  isDiplomsUpdate = false;
  diplomsFilter = false;
  isAdmin = false;
  changePm = false;
  changeOrder = false;
  changeReviewer = false;
  changeNormoconntroller = false;
  changeSpecialty = false;
  changeCommission = false;
  changeChairman = false;
  diploms = [];
}
