import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReportsFormComponent } from '../reports-form/reports-form.component';
import { Report } from '../../shared/models/report';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reports-add',
  templateUrl: './reports-add.component.html',
  styleUrls: ['./reports-add.component.scss'],
})
export class ReportsAddComponent implements OnInit {
  @ViewChild(ReportsFormComponent, { static: false }) reportForm: ReportsFormComponent;
  public userID;
  public errorMessages$ = new Subject();

  constructor(
    private router: Router,
    private data: DataService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {}

  onSaveReport(report: Report) {
    this.data
      .addReport(report)
      .then((doc) => {
        this.router.navigate(['./reports']);
        this.messageService.add({ severity: 'success', summary: 'Add new report', detail: `Report ${doc.id} has been succeffully saved.` });
        this.ref.close();
      })
      .catch((e) => {
        this.errorMessages$.next('Something is wrong when adding to DB');
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
