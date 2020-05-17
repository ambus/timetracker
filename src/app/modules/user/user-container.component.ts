import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../core/firebase/firebase-auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
})
export class UserContainerComponent implements OnInit, OnDestroy {
  public errorMessages$ = this.afAuthService.authErrorMessages$;
  public user$ = this.afAuthService.user$;
  public isLoading$ = this.afAuthService.isLoading$;
  public loginForm: FormGroup;
  public hide = true;
  public userSubscription: Subscription;

  constructor(private fb: FormBuilder, private afAuthService: FirebaseAuthService, private router: Router) {}

  ngOnInit(): void {
    this.createLoginForm();

    this.userSubscription = this.user$.subscribe((user) => {
      this.router.navigate(['/reports']);
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public signUp() {
    this.checkFormValidity(() => {
      this.afAuthService.signUpFirebase(this.loginForm.value);
    });
  }

  public login() {
    this.checkFormValidity(() => {
      this.afAuthService.loginFirebase(this.loginForm.value);
    });
  }

  private checkFormValidity(cb: () => void) {
    if (this.loginForm.valid) {
      cb();
    } else {
      this.errorMessages$.next('Please enter correct Email and Password value');
    }
  }

  public logOut() {
    this.afAuthService.logOutFirebase();
  }

  public getErrorMessage(controlName: string, errorName?: string): string {
    const control = this.loginForm.get(controlName);
    return control.hasError('required') ? 'You must enter a value' : control.hasError(errorName) ? `Not a valid ${errorName}` : '';
  }
}
