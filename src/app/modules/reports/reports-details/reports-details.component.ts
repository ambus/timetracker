import { Component, OnInit, Input } from '@angular/core';
import { Report } from '../../shared/models/report';

@Component({
  selector: 'app-reports-details',
  templateUrl: './reports-details.component.html',
  styleUrls: ['./reports-details.component.scss'],
})
export class ReportsDetailsComponent implements OnInit {
  @Input() selectedReport: Report;
  @Input() displayDialog: boolean;

  constructor() {}

  ngOnInit(): void {}

  onDialogHide() {
    this.selectedReport = null;
  }
}
