import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { UserInfoComponent } from '../../user-info/user-info.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  providers: [DialogService]
})
export class FooterComponent implements OnInit {
  ref: DynamicDialogRef;
  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}

  clickTest(event): void {}

  openUserInfoDialog(): void {
    this.ref = this.dialogService.open(UserInfoComponent, {
      header: 'User info',
      width: '80%',
      contentStyle: { 'max-height': '350px', overflow: 'auto' },
    });
  }
}
