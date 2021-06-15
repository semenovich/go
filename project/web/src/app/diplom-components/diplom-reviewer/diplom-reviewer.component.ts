import { Component, OnInit } from '@angular/core';
import {TeacherModel} from '../../common/models/teacher.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DiplomService} from '../../common/services/diplom.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {DiplomDataService} from '../../common/services/diplom-data.service';

@Component({
  selector: 'app-diplom-reviewer',
  templateUrl: './diplom-reviewer.component.html',
  styleUrls: ['./diplom-reviewer.component.scss']
})
export class DiplomReviewerComponent implements OnInit {

  reviewerList: TeacherModel[];
  reviewerForm: FormGroup;
  buttonTitleAdd = true;
  tab = 'add';
  constructor(
    private diplomService: DiplomService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private diplomDataService: DiplomDataService
  ) {
  }

  ngOnInit(): void {
    this.getReviewerList();
    this.formInit();
  }

  private getReviewerList() {
    this.diplomService.getReviewers().subscribe(res => {
      this.reviewerList = res;
    });
  }

  private formInit() {
    this.reviewerForm = this.fb.group({
      Id: [0],
      Fio: ['', Validators.required],
    });
  }

  onSubmit() {
    const reviewer: TeacherModel = this.reviewerForm.getRawValue();
    if (this.buttonTitleAdd) {
      this.diplomService.createReviewer(reviewer).subscribe(res => {
        this.toastr.success('Добавлен');
        this.getReviewerList();
        this.diplomDataService.changeReviewer = true;
      });
    } else {
      this.diplomService.updateeReviewer(reviewer).subscribe(res => {
        this.toastr.success('Обновлен');
        this.getReviewerList();
        this.diplomDataService.changeReviewer = true;
      });
    }
    this.formInit();
    this.buttonTitleAdd = true;
    this.tab = 'add';
  }

  deleteReviewer(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diplomService.deleteReviewer(id).subscribe(res => {
          this.toastr.success('Удален');
          this.getReviewerList();
          this.diplomDataService.changeReviewer = true;
        }, error => {
          this.toastr.error('Нарушение ограничений целостности');
        });
      }
      this.formInit();
      this.buttonTitleAdd = true;
      this.tab = 'add';
    });
  }

  changeReviewer(id: number) {
    const item = this.reviewerList.find(el => el.Id === id);
    this.reviewerForm.patchValue({
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
