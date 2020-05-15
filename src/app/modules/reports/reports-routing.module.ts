import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsAddComponent } from './reports-add/reports-add.component';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsListComponent,
  },
  {
    path: 'add',
    component: ReportsAddComponent,
  },
  {
    path: ':id',
    component: ReportsDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
