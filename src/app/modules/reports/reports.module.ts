import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsAddComponent } from './reports-add/reports-add.component';
import { ReportsDetailsComponent } from './reports-details/reports-details.component';
import { DataViewModule } from 'primeng/dataview';
import { SharedModule } from '../shared/shared.module';
import { PanelModule } from 'primeng/panel';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ReportsFormComponent } from './reports-form/reports-form.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ReportsListComponent, ReportsAddComponent, ReportsDetailsComponent, ReportsFormComponent],
  imports: [CommonModule, ReportsRoutingModule, DataViewModule, SharedModule, PanelModule, VirtualScrollerModule, CalendarModule],
})
export class ReportsModule {}
