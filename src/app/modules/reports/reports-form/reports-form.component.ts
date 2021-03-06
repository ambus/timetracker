import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Report } from '../../shared/models/report';

@Component({
  selector: 'app-reports-form',
  templateUrl: './reports-form.component.html',
  styleUrls: ['./reports-form.component.scss'],
})
export class ReportsFormComponent implements OnInit {
  @Input() report: Report;
  @Output() saveReport = new EventEmitter<Report>();
  @Output() sendError = new EventEmitter<string>();

  reportForm: FormGroup;
  test = new Date();

  dataPickerStyle = {
    'z-index': 1000,
  } as const;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.report) {
      this.reportForm.patchValue({ day: new Date(this.report.day), time: this.report.time, project: this.report.project });
    }
  }

  createForm() {
    this.reportForm = this.fb.group({
      day: [new Date(), Validators.required],
      time: ['', Validators.required],
      project: ['', Validators.required],
    });
  }
}
