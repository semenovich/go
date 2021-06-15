import { Component, OnInit } from '@angular/core';
import {TeacherModel} from '../../common/models/teacher.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DiplomService} from '../../common/services/diplom.service';
import {ToastrService} from 'ngx-toastr';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DiplomDataService} from "../../common/services/diplom-data.service";

@Component({
  selector: 'app-diplom-chairman',
  templateUrl: './diplom-chairman.component.html',
  styleUrls: ['./diplom-chairman.component.scss']
})
export class DiplomChairmanComponent implements OnInit {

  chairmanList: TeacherModel[];
  chairmanForm: FormGroup;
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
    this.diplomService.getChairmans().subscribe(res => {
      this.chairmanList = res;
    });
  }

  private formInit() {
    this.chairmanForm = this.fb.group({
      Id: [0],
      Fio: ['', Validators.required],
    });
  }

  onSubmit() {
    const сhairman: TeacherModel = this.chairmanForm.getRawValue();
    if (this.buttonTitleAdd) {
      this.diplomService.createChairman(сhairman).subscribe(res => {
        this.toastr.success('Добавлен');
        this.getPmList();
        this.diplomDataService.changeChairman = true;
      });
    } else {
      this.diplomService.updateeChairman(сhairman).subscribe(res => {
        this.toastr.success('Обновлен');
        this.getPmList();
        this.diplomDataService.changeChairman = true;
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
        this.diplomService.deleteChairman(id).subscribe(res => {
          this.toastr.success('Удален');
          this.getPmList();
          this.diplomDataService.changeChairman = true;
        });
      }
      this.formInit();
      this.buttonTitleAdd = true;
      this.tab = 'add';
    });
  }

  changeChairman(id: number) {
    const item = this.chairmanList.find(el => el.Id === id);
    this.chairmanForm.patchValue({
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
