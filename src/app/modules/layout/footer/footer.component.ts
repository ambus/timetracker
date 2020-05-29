import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { UserInfoComponent } from '../../user-info/user-info.component';
import { AuthService } from '../../core/auth.service';
import { ReportsAddComponent } from '../../reports/reports-add/reports-add.component';
import { Report } from '../../shared/models/report';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [DialogService],
})
export class FooterComponent implements OnInit {
  public user$ = this.authService.user$;

  ref: DynamicDialogRef;
  constructor(public dialogService: DialogService, public authService: AuthService) {}

  ngOnInit(): void {}

  createNewReport(): void {
    this.ref = this.dialogService.open(ReportsAddComponent, {
      header: 'Create report',
      width: '70%',
      contentStyle: { 'max-height': '450px', overflow: 'auto' },
    });

    this.ref.onClose.subscribe((report: Report) => {});
  }

  openUserInfoDialog(): void {
    this.ref = this.dialogService.open(UserInfoComponent, {
      header: 'User info',
      width: '80%',
      contentStyle: { 'max-height': '350px', overflow: 'auto' },
    });
  }
}
