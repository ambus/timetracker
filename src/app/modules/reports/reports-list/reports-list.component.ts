import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { DataService } from '../../core/data.service';
import { Report } from '../../shared/models/report';
import { ReportsDetailsComponent } from '../reports-details/reports-details.component';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
  providers: [DialogService, DynamicDialogRef],
  encapsulation: ViewEncapsulation.None,
})
export class ReportsListComponent implements OnInit {
  reports$: Observable<Report[]>;

  isDbLoading$;
  ref: DynamicDialogRef;

  constructor(private db: DataService, public dialogService: DialogService) {}

  ngOnInit() {
    this.reports$ = this.db.getReports();

    this.isDbLoading$ = this.db.isLoading$;
  }

  selectReport(event: Event, report: Report) {
    this.ref = this.dialogService.open(ReportsDetailsComponent, {
      header: 'Create report',
      width: '70%',
      contentStyle: { 'max-height': '450px', overflow: 'auto' },
      data: {
        report: report,
      },
    });
  }
}
