import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DiplomService} from '../../common/services/diplom.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {DiplomDataService} from '../../common/services/diplom-data.service';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';
import {SpecialytyModel} from '../../common/models/specialyty.model';

@Component({
  selector: 'app-diplom-specialyty',
  templateUrl: './diplom-specialyty.component.html',
  styleUrls: ['./diplom-specialyty.component.scss']
})
export class DiplomSpecialytyComponent implements OnInit {
  specialytyList: SpecialytyModel[];
  specialytyForm: FormGroup;
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
    this.getSpecialytyList();
    this.formInit();
  }

  private getSpecialytyList() {
    this.diplomService.getSpecialtys().subscribe(res => {
      this.specialytyList = res;
    });
  }

  private formInit() {
    this.specialytyForm = this.fb.group({
      Id: [0],
      Name: ['', Validators.required],
    });
  }

  onSubmit() {
    const specialyty: SpecialytyModel = this.specialytyForm.getRawValue();
    if (this.buttonTitleAdd) {
      this.diplomService.createSpecialtys(specialyty).subscribe(res => {
        this.toastr.success('Добавлен');
        this.getSpecialytyList();
        this.diplomDataService.changeSpecialty = true;
      });
    } else {
      this.diplomService.updateSpecialtys(specialyty).subscribe(res => {
        this.toastr.success('Обновлен');
        this.getSpecialytyList();
        this.diplomDataService.changeSpecialty = true;
      });
    }
    this.formInit();
    this.buttonTitleAdd = true;
    this.tab = 'add';
  }

  deleteSpecialyty(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diplomService.deleteSpecialtys(id).subscribe(res => {
          this.toastr.success('Удален');
          this.getSpecialytyList();
          this.diplomDataService.changeSpecialty = true;
        }, error => {
          this.toastr.error('Нарушение ограничений целостности');
        });
      }
      this.formInit();
      this.buttonTitleAdd = true;
      this.tab = 'add';
    });
  }

  changeSpecialyty(id: number) {
    const item = this.specialytyList.find(el => el.Id === id);
    this.specialytyForm.patchValue({
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
