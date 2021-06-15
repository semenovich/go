import {Component, OnInit} from '@angular/core';
import {DiplomService} from '../../common/services/diplom.service';
import {TeacherModel} from '../../common/models/teacher.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {DiplomModel} from '../../common/models/diplom.model';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../dialogs/confirm-dialog/confirm-dialog.component";
import {DiplomDataService} from "../../common/services/diplom-data.service";

@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.scss']
})
export class PmComponent implements OnInit {

  pmList: TeacherModel[];
  pmForm: FormGroup;
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
    this.getPmList();
    this.formInit();
  }

  private getPmList() {
    this.diplomService.getPms().subscribe(res => {
      this.pmList = res;
    });
  }

  private formInit() {
    this.pmForm = this.fb.group({
      Id: [0],
      Fio: ['', Validators.required],
    });
  }

  onSubmit() {
    const pm: TeacherModel = this.pmForm.getRawValue();
    if (this.buttonTitleAdd) {
      this.diplomService.createPm(pm).subscribe(res => {
        this.toastr.success('Добавлен');
        this.getPmList();
        this.diplomDataService.changePm = true;
      });
    } else {
      this.diplomService.updateePm(pm).subscribe(res => {
        this.toastr.success('Обновлен');
        this.getPmList();
        this.diplomDataService.changePm = true;
      });
    }
    this.formInit();
    this.buttonTitleAdd = true;
  }

  deletePm(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diplomService.deletePm(id).subscribe(res => {
          this.toastr.success('Удален');
          this.getPmList();
          this.diplomDataService.changePm = true;
        }, error => {
          this.toastr.error('Нарушение ограничений целостности');
        });
      }
      this.formInit();
      this.buttonTitleAdd = true;
      this.tab = 'add';
    });
  }

  changePm(id: number) {
    const item = this.pmList.find(el => el.Id === id);
    this.pmForm.patchValue({
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
