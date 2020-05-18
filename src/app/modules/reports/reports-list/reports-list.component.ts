import { Component, OnInit } from '@angular/core';
import { Report } from '../../shared/models/report';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
})
export class ReportsListComponent implements OnInit {
  reports: Report[] = [
    {
      id: 'sadfsadf',
      day: '2020-05-20',
      timeSum: 8,
      created_at: 1589810564784,
      updated_at: 1589810564784,
    },
    {
      id: '2123123123',
      day: '2020-05-20',
      timeSum: 8,
      created_at: 1589810564784,
      updated_at: 1589810564784,
    },
    {
      id: '21231231112223',
      day: '2020-05-20',
      timeSum: 8,
      created_at: 1589810564784,
      updated_at: 1589810564784,
    },
    {
      id: 'sdfasdfsdfsdgg',
      day: '2020-05-20',
      timeSum: 8,
      created_at: 1589810564784,
      updated_at: 1589810564784,
    },
  ];

  selectedReport: Report;

  displayDialog: boolean;

  sortOptions: { label: string; value: string }[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  constructor() {}

  ngOnInit() {
    // this.carService.getCarsLarge().then(cars => this.cars = cars);

    this.sortOptions = [
      { label: 'Newest First', value: '!created_at' },
      { label: 'Oldest First', value: 'created_at' },
      { label: 'Day', value: 'day' },
    ];
  }

  selectReport(event: Event, report: Report) {
    this.selectedReport = report;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedReport = null;
  }
}
