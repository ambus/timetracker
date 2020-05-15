import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsAddComponent } from './reports-add/reports-add.component';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';


@NgModule({
  declarations: [ReportsListComponent, ReportsAddComponent, ReportsDetailsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
