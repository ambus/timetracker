import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReportsFormComponent } from '../reports-form/reports-form.component';

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
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {}

  onSaveReport(values) {
    debugger;
    this.data
      .addReport(values)
      .then((doc) => {
        this.router.navigate(['./reports']);
        this.messageService.add({ severity: 'success', summary: 'Add new report', detail: `Report ${doc.id} has been succeffully saved.` });
      })
      .catch((e) => {
        this.errorMessages$.next('Something is wrong when adding to DB');
      });
  }

  onSendError(message) {
    this.errorMessages$.next(message);
  }

  saveReport() {
    this.onSaveReport(this.reportForm.reportForm.value);
  }

  cancel() {
    this.ref.close();
  }
}
