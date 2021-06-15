export class DiplomModel {
  Id: number;
  Fio: string;
  Topic: string;
  Completion: number;
  Score: number;
  Deadline: string;
  Queuenumber: number;
  PmId: number;
  NormcontrollerId: number;
  ReviewerId: number;
  ChairmanId: number;
  DiplomorderId: number;
  SpecialtyId: number;
  CommissionId: number;
  Execution: string;
  Type: number;
  CommissionComment: string;
  Time: number;
  Ordernumber: number;
  constructor() {
    this.Id = 0;
    this.Fio = '';
    this.Topic = '';
    this.Completion = 0;
    this.Score = 0;
    this.Deadline = '';
    this.Queuenumber = 0;
    this.PmId = 0;
    this.NormcontrollerId = 0;
    this.ReviewerId = 0;
    this.ChairmanId = 0;
    this.DiplomorderId = 0;
    this.SpecialtyId = 0;
    this.CommissionId = 0;
    this.Execution = '';
    this.Type = 1;
    this.CommissionComment = '';
    this.Time = 0;
    this.Ordernumber = 0;
  }
}
