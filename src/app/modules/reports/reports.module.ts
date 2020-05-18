import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsAddComponent } from './reports-add/reports-add.component';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';
import { DataViewModule } from 'primeng/dataview';
import { SharedModule } from '../shared/shared.module';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [ReportsListComponent, ReportsAddComponent, ReportsDetailsComponent],
  imports: [CommonModule, ReportsRoutingModule, DataViewModule, SharedModule, PanelModule],
})
export class ReportsModule {}
