import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DiplomLayoutComponent} from './diplom-components/diplom-layout/diplom-layout.component';
import {PmComponent} from './diplom-components/diplom-pm/pm.component';
import {DiplomReviewerComponent} from './diplom-components/diplom-reviewer/diplom-reviewer.component';
import {DiplomNormocontrollerComponent} from './diplom-components/diplom-normocontroller/diplom-normocontroller.component';
import {DiplomChairmanComponent} from './diplom-components/diplom-chairman/diplom-chairman.component';
import {DiplomCommissionComponent} from './diplom-components/diplom-commission/diplom-commission.component';
import {DiplomOrderComponent} from './diplom-components/diplom-order/diplom-order.component';
import {DiplomIdComponent} from './diplom-components/diplom-info/diplom-id/diplom-id.component';
import {DiplomSpecialytyComponent} from "./diplom-components/diplom-specialyty/diplom-specialyty.component";
import {DiplomDefComponent} from "./diplom-components/diplom-info/diplom-def/diplom-def.component";


const routes: Routes = [{
  path: '',
  component: DiplomLayoutComponent,
  children: [
    {
      path: 'pm',
      component: PmComponent,
    },
    {
      path: 'chairman',
      component: DiplomChairmanComponent,
    },
    {
      path: 'commission',
      component: DiplomCommissionComponent,
    },
    {
      path: 'reviewer',
      component: DiplomReviewerComponent,
    },
    {
      path: 'normcontroller',
      component: DiplomNormocontrollerComponent,
    },
    {
      path: 'diplomOrder',
      component: DiplomOrderComponent,
    },
    {
      path: 'specialyty',
      component: DiplomSpecialytyComponent,
    },
  ]
},
  {
    path: 'diplom/:id',
    component: DiplomIdComponent,
  },
  {
    path: 'protection',
    component: DiplomDefComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
