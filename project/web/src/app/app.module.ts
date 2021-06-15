import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiplomComponent } from './diplom-components/diplom-info/diplom.component';
import { DiplomListComponent } from './diplom-components/diplom-info/diplom-list/diplom-list.component';
import { DiplomDetailComponent } from './diplom-components/diplom-info/diplom-detail/diplom-detail.component';
import { PmComponent } from './diplom-components/diplom-pm/pm.component';
import { DiplomLayoutComponent } from './diplom-components/diplom-layout/diplom-layout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ValidationService} from './common/services/validation.service';
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccordionConfig, AccordionModule} from 'ngx-bootstrap/accordion';
import { DiplomReviewerComponent } from './diplom-components/diplom-reviewer/diplom-reviewer.component';
import { DiplomNormocontrollerComponent } from './diplom-components/diplom-normocontroller/diplom-normocontroller.component';
import { DiplomChairmanComponent } from './diplom-components/diplom-chairman/diplom-chairman.component';
import { DiplomCommissionComponent } from './diplom-components/diplom-commission/diplom-commission.component';
import { DiplomOrderComponent } from './diplom-components/diplom-order/diplom-order.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { DiplomIdComponent } from './diplom-components/diplom-info/diplom-id/diplom-id.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {MatDialogModule} from '@angular/material/dialog';
import { PasswordDialogComponent } from './diplom-components/dialogs/password-dialog/password-dialog.component';
import { ConfirmDialogComponent } from './diplom-components/dialogs/confirm-dialog/confirm-dialog.component';
import { DiplomSpecialytyComponent } from './diplom-components/diplom-specialyty/diplom-specialyty.component';
import { DiplomDefComponent } from './diplom-components/diplom-info/diplom-def/diplom-def.component';

// export const options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    DiplomComponent,
    DiplomListComponent,
    DiplomDetailComponent,
    PmComponent,
    DiplomLayoutComponent,
    DiplomReviewerComponent,
    DiplomNormocontrollerComponent,
    DiplomChairmanComponent,
    DiplomCommissionComponent,
    DiplomOrderComponent,
    DiplomIdComponent,
    PasswordDialogComponent,
    ConfirmDialogComponent,
    DiplomSpecialytyComponent,
    DiplomDefComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: 'inline'}),
    ToastContainerModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AccordionModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(),
    MatDialogModule
  ],
  providers: [ValidationService, AccordionConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
