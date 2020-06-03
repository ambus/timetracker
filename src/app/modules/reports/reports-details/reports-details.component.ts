import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { DataService } from '../../core/data.service';
import { Report } from '../../shared/models/report';
import { ReportsFormComponent } from '../reports-form/reports-form.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reports-details',
  templateUrl: './reports-details.component.html',
  styleUrls: ['./reports-details.component.scss'],
})
export class ReportsDetailsComponent implements OnInit {
  @ViewChild(ReportsFormComponent, { static: false }) reportForm: ReportsFormComponent;

  public errorMessages$ = new Subject();

  public isEdit = false;

  constructor(
    private data: DataService,
    private router: Router,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {}

  edit(): void {
    setTimeout(() => {
      this.isEdit = true;
    }, 0);
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

  onSaveReport(report: Report) {
    this.data
      .addReport(report)
      .then((doc) => {
        this.router.navigate(['./reports']);
        this.messageService.add({ severity: 'success', summary: 'Save report', detail: `Report ${doc.id} has been succeffully saved.` });
        this.ref.close();
      })
      .catch((e) => {
        this.errorMessages$.next('Something is wrong when saveing to DB');
      });
  }

  onSendError(message) {
    this.errorMessages$.next(message);
  }

  saveReport() {
    let reportToSave: any = this.reportForm.reportForm.value;
    reportToSave.day = formatDate(reportToSave.day, 'yyyy-MM-dd', this.locale);
    this.onSaveReport(reportToSave);
  }
}
