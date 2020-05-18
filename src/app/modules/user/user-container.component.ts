import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
})
export class UserContainerComponent implements OnInit, OnDestroy {
  public errorMessages$ = this.authService.authErrorMessages$;
  public user$ = this.authService.user$;
  public isLoading$ = this.authService.isLoading$;
  public loginForm: FormGroup;
  public hide = true;
  public userSubscription: Subscription;
  public production = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.createLoginForm();

    this.userSubscription = this.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['/reports']);
      }
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
      this.authService.signUpFirebase(this.loginForm.value);
    });
  }

  public login() {
    this.checkFormValidity(() => {
      this.authService.loginFirebase(this.loginForm.value);
    });
  }

  private checkFormValidity(cb: () => void) {
    if (this.loginForm.valid) {
      cb();
    } else {
      this.errorMessages$.next('Please enter correct Email and Password value');
    }
  }

  public getErrorMessage(controlName: string, errorName?: string): string {
    const control = this.loginForm.get(controlName);
    return control.hasError('required') ? 'You must enter a value' : control.hasError(errorName) ? `Not a valid ${errorName}` : '';
  }
}
