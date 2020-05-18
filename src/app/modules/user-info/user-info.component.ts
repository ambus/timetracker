import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FirebaseAuthService } from '../core/firebase/firebase-auth.service';
import { tap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public user$ = this.authService.user$;

  constructor(
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  public logOut() {
    this.authService.logOutFirebase();
  }
}
