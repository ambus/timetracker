import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-reports-details',
  templateUrl: './reports-details.component.html',
  styleUrls: ['./reports-details.component.scss'],
})
export class ReportsDetailsComponent implements OnInit {
  public errorMessages$ = new Subject();

  constructor(
    private data: DataService,
    private router: Router,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {}

  edit(): void {
    //TODO
  }

  get report() {
    return this.config?.data?.report;
  }

  remove(): void {
    if (confirm('Are you sure?')) {
      this.data
        .deleteReport(this.report.id)
        .then(() => {
          this.router.navigate(['./reports']);
          this.messageService.add({
            severity: 'success',
            summary: 'Delete report',
            detail: `Report ${this.report.id} successfully was deleted.`,
          });
          this.ref.close();
        })
        .catch((e) => {
          this.errorMessages$.next('Unable to delete this report');
        });
    }
  }
}
