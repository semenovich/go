import {TeacherModel} from './teacher.model';
import {SpecialytyModel} from './specialyty.model';
import {DiplomorderModel} from './diplomorder.model';

export class DiplomInfoModel {
  pmList: TeacherModel[];
  normcontrollerList: TeacherModel[];
  reviewerList: TeacherModel[];
  chairmanList: TeacherModel[];
  diplomorderList: DiplomorderModel[];
  specialtyList: SpecialytyModel[];
  commissionList: TeacherModel[];
}
