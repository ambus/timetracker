import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Report } from '../../shared/models/report';
import { Observable, OperatorFunction } from 'rxjs';
import { DataService } from '../../core/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportsListComponent implements OnInit {
  reports$: Observable<Report[]>;

  isDbLoading$;

  selectedReport: Report;

  displayDialog: boolean;

  constructor(private db: DataService) {}

  ngOnInit() {
    this.reports$ = this.db.getReports();

    this.isDbLoading$ = this.db.isLoading$;
  }

  selectReport(event: Event, report: Report) {
    this.selectedReport = report;
    this.displayDialog = true;
    event.preventDefault();
  }
}
