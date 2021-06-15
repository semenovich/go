import {Component, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {DiplomDataService} from '../../common/services/diplom-data.service';
import {MatDialog} from '@angular/material/dialog';
import {PasswordDialogComponent} from '../dialogs/password-dialog/password-dialog.component';
import {DiplomService} from '../../common/services/diplom.service';

@Component({
  selector: 'app-diplom-layout',
  templateUrl: './diplom-layout.component.html',
  styleUrls: ['./diplom-layout.component.scss']
})
export class DiplomLayoutComponent implements DoCheck {

  tab = '';
  isAdmin: boolean;

  password: string;

  constructor(
    private router: Router,
    private diplomDataService: DiplomDataService,
    private dialog: MatDialog,
    private diplomService: DiplomService
  ) {
  }

  ngDoCheck() {
    this.isAdmin = this.diplomDataService.isAdmin;
  }

  changeTab(rel) {
    this.tab = rel;
    this.router.navigate([rel]);
  }

  changeRole() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: '250px',
      data: {password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.password = result;
      const today = new Date();
      const pass = today.getMonth() + 1 + today.getDate() + today.getFullYear();
      if (+this.password === pass) {
        this.diplomDataService.isAdmin = true;
      }
    });
  }

  changeTxt() {
    this.diplomService.downlad(this.diplomDataService.diploms).subscribe(blob  => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'дипломы.txt';
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  protection() {
    this.router.navigate(['/protection/']);
  }
}
