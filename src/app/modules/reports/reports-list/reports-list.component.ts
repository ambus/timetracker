import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Report } from '../../shared/models/report';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportsListComponent implements OnInit {
  reports: Report[] = [
    {
      id: 'sadfsadf',
      day: '2020-05-20',
      time: 8,
      created_at: 1589810564784,
      updated_at: 1589810564784,
      project: 'sdfsdf',
    },
    {
      id: '2123123123',
      day: '2020-05-18',
      time: 8,
      created_at: 1589810344784,
      updated_at: 1589810564784,
      project: 'sdfsdf',
    },
    {
      id: '21231231112223',
      day: '2020-05-19',
      time: 8,
      created_at: 1589810774784,
      updated_at: 1589810564784,
      project: 'sdfsdf',
    },
    {
      id: 'sdfasdfsdfsdgg',
      day: '2020-05-21',
      time: 8,
      created_at: 1589810994784,
      updated_at: 1589810564784,
      project: 'sdfsdf',
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
    this.sort();
  }

  sort(): void {
    let reports = [...this.reports];
    reports.sort((data1, data2) => {
      let value1 = data1[this.sortField];
      let value2 = data2[this.sortField];
      let result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return this.sortOrder * result;
    });

    this.reports = reports;
  }
}
