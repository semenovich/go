import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DiplomModel} from '../models/diplom.model';
import {TeacherModel} from '../models/teacher.model';
import {DiplomorderModel} from '../models/diplomorder.model';
import {SpecialytyModel} from '../models/specialyty.model';

@Injectable({
  providedIn: 'root'
})
export class DiplomService {
  url = 'http://localhost:8185/api';

  constructor(private http: HttpClient) {
  }

  getAllDiploms(): Observable<DiplomModel[]> {
    return this.http.get<DiplomModel[]>(
      `${this.url}/diploms`
    );
  }

  getDiplomById(id): Observable<DiplomModel> {
    return this.http.get<DiplomModel>(
      `${this.url}/diploms/${id}`
    );
  }

  updateDiplom(diplom: DiplomModel): Observable<any> {
    return this.http.put<DiplomModel>(`${this.url}/diploms`, JSON.stringify(diplom));
  }

  deleteDiplom(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.url}/diploms/${id}`
    );
  }

  createDiplom(diplom: DiplomModel): Observable<DiplomModel> {
    return this.http.post<DiplomModel>(`${this.url}/diploms`, JSON.stringify(diplom));
  }

  getChairmans(): Observable<TeacherModel[]> {
    return this.http.get<TeacherModel[]>(
      `${this.url}/chairmans`
    );
  }

  createChairman(pm: TeacherModel): any {
    return this.http.post<TeacherModel>(`${this.url}/chairmans`, JSON.stringify(pm));
  }

  updateeChairman(pm: TeacherModel): any {
    return this.http.put<TeacherModel>(`${this.url}/chairmans`, JSON.stringify(pm));
  }

  deleteChairman(id: number): any {
    return this.http.delete<any>(
      `${this.url}/chairmans/${id}`
    );
  }

  getCommissions(): Observable<TeacherModel[]> {
    return this.http.get<TeacherModel[]>(
      `${this.url}/commissions`
    );
  }

  createCommission(pm: TeacherModel): any {
    return this.http.post<TeacherModel>(`${this.url}/commissions`, JSON.stringify(pm));
  }

  updateeCommission(pm: TeacherModel): any {
    return this.http.put<TeacherModel>(`${this.url}/commissions`, JSON.stringify(pm));
  }

  deleteCommission(id: number): any {
    return this.http.delete<any>(
      `${this.url}/commissions/${id}`
    );
  }

  getDiplomorders(): Observable<DiplomorderModel[]> {
    return this.http.get<DiplomorderModel[]>(
      `${this.url}/diplomorders`
    );
  }

  createDiplomorder(pm: DiplomorderModel): any {
    return this.http.post<DiplomorderModel>(`${this.url}/diplomorders`, JSON.stringify(pm));
  }

  updateeDiplomorder(pm: DiplomorderModel): any {
    return this.http.put<DiplomorderModel>(`${this.url}/diplomorders`, JSON.stringify(pm));
  }

  deleteDiplomorder(id: number): any {
    return this.http.delete<any>(
      `${this.url}/diplomorders/${id}`
    );
  }

  getNormcontrollers(): Observable<TeacherModel[]> {
    return this.http.get<TeacherModel[]>(
      `${this.url}/normcontrollers`
    );
  }

  createNormcontroller(pm: TeacherModel): any {
    return this.http.post<TeacherModel>(`${this.url}/normcontrollers`, JSON.stringify(pm));
  }

  updateeNormcontroller(pm: TeacherModel): any {
    return this.http.put<TeacherModel>(`${this.url}/normcontrollers`, JSON.stringify(pm));
  }

  deleteNormcontroller(id: number): any {
    return this.http.delete<any>(
      `${this.url}/normcontrollers/${id}`
    );
  }

  getPms(): Observable<TeacherModel[]> {
    return this.http.get<TeacherModel[]>(
      `${this.url}/pms`
    );
  }

  createPm(pm: TeacherModel): any {
    return this.http.post<TeacherModel>(`${this.url}/pms`, JSON.stringify(pm));
  }

  updateePm(pm: TeacherModel): any {
    return this.http.put<TeacherModel>(`${this.url}/pms`, JSON.stringify(pm));
  }

  deletePm(id: number): any {
    return this.http.delete<any>(
      `${this.url}/pms/${id}`
    );
  }

  getReviewers(): Observable<TeacherModel[]> {
    return this.http.get<TeacherModel[]>(
      `${this.url}/reviewers`
    );
  }

  createReviewer(pm: TeacherModel): any {
    return this.http.post<TeacherModel>(`${this.url}/reviewers`, JSON.stringify(pm));
  }

  updateeReviewer(pm: TeacherModel): any {
    return this.http.put<TeacherModel>(`${this.url}/reviewers`, JSON.stringify(pm));
  }

  deleteReviewer(id: number): any {
    return this.http.delete<any>(
      `${this.url}/reviewers/${id}`
    );
  }

  getSpecialtys(): Observable<SpecialytyModel[]> {
    return this.http.get<SpecialytyModel[]>(
      `${this.url}/specialtys`
    );
  }

  createSpecialtys(pm: SpecialytyModel): any {
    return this.http.post<SpecialytyModel>(`${this.url}/specialtys`, JSON.stringify(pm));
  }

  updateSpecialtys(pm: SpecialytyModel): any {
    return this.http.put<SpecialytyModel>(`${this.url}/specialtys`, JSON.stringify(pm));
  }

  deleteSpecialtys(id: number): any {
    return this.http.delete<any>(
      `${this.url}/specialtys/${id}`
    );
  }

  downlad(diploms): any {
    return this.http.post(`${this.url}/doc`, JSON.stringify(diploms), {
      responseType: 'blob'
    });
  }
}
