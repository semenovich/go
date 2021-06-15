import { Component, OnInit } from '@angular/core';
import {TeacherModel} from '../../common/models/teacher.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DiplomService} from '../../common/services/diplom.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../dialogs/confirm-dialog/confirm-dialog.component";
import {DiplomDataService} from "../../common/services/diplom-data.service";

@Component({
  selector: 'app-diplom-commission',
  templateUrl: './diplom-commission.component.html',
  styleUrls: ['./diplom-commission.component.scss']
})
export class DiplomCommissionComponent implements OnInit {

  commissionList: TeacherModel[];
  commissionForm: FormGroup;
  buttonTitleAdd = true;
  tab = 'add';
  constructor(
    private diplomService: DiplomService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private diplomDataService: DiplomDataService
  ) {
  }

  ngOnInit(): void {
    this.getPmList();
    this.formInit();
  }

  private getPmList() {
    this.diplomService.getCommissions().subscribe(res => {
      this.commissionList = res;
    });
  }

  private formInit() {
    this.commissionForm = this.fb.group({
      Id: [0],
      Fio: ['', Validators.required],
    });
  }

  onSubmit() {
    const commission: TeacherModel = this.commissionForm.getRawValue();
    if (this.buttonTitleAdd) {
      this.diplomService.createCommission(commission).subscribe(res => {
        this.toastr.success('Добавлен');
        this.getPmList();
        this.diplomDataService.changeCommission = true;
      });
    } else {
      this.diplomService.updateeCommission(commission).subscribe(res => {
        this.toastr.success('Обновлен');
        this.getPmList();
        this.diplomDataService.changeCommission = true;
      });
    }
    this.formInit();
    this.buttonTitleAdd = true;
    this.tab = 'add';
  }

  deleteChairman(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diplomService.deleteCommission(id).subscribe(res => {
          this.toastr.success('Удален');
          this.getPmList();
          this.diplomDataService.changeCommission = true;
        }, error => {
          this.toastr.error('Нарушение ограничений целостности');
        });
      }
      this.formInit();
      this.buttonTitleAdd = true;
      this.tab = 'add';
    });
  }

  changeChairman(id: number) {
    const item = this.commissionList.find(el => el.Id === id);
    this.commissionForm.patchValue({
      ...item
    });
    this.buttonTitleAdd = false;
    this.tab = 'change';
  }

  changeTab(ev) {
    this.formInit();
    this.buttonTitleAdd = true;
    this.tab = 'add';
  }
}
