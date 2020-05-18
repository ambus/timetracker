import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginCredentials } from '../shared/models/login-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authErrorMessages$ = new BehaviorSubject<string>(null);
  public isLoading$ = new BehaviorSubject<boolean>(true);
  public user$ = new BehaviorSubject<User>(null);

  private authState = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.isLoggedIn().subscribe((user) => (this.authState = user));
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  private isLoggedIn(): Observable<User | null> {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          const { email, uid } = user;
          this.user$.next({ email, uid });
          return { email, uid };
        }
        return null;
      }),
      tap(() => this.isLoading$.next(false))
    );
  }

  public loginFirebase({ email, password }: LoginCredentials) {
    this.isLoading$.next(true);
    this.handleErrorOrSuccess(() => {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    });
  }

  public async getCurrentUserUid(): Promise<string> {
    const user = await this.afAuth.currentUser;
    return user.uid;
  }

  public signUpFirebase({ email, password }: { email: string; password: string }) {
    this.isLoading$.next(true);
    this.handleErrorOrSuccess(() => {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    });
  }

  public logOutFirebase() {
    this.isLoading$.next(true);
    return this.afAuth
      .signOut()
      .then(() => {
        this.isLoading$.next(false);
        this.user$.next(null);
      })
      .catch((e) => {
        console.error(e);
        this.isLoading$.next(false);

        this.authErrorMessages$.next('Something is wrong when signing out!');
      })
      .finally(() => {
        this.router.navigate(['/user']);
      });
  }

  private handleErrorOrSuccess(cb: () => Promise<firebase.auth.UserCredential>) {
    cb()
      .then((data) => this.authenticateUser(data))
      .catch((e) => this.handleSignUpLoginError(e));
  }

  private authenticateUser(userCredential) {
    const {
      user: { email, uid },
    } = userCredential;
    this.isLoading$.next(false);
    this.user$.next({ email, uid });
  }

  private handleSignUpLoginError(error: { code: string; message: string }) {
    this.isLoading$.next(false);
    const errorMessage = error.message;
    this.authErrorMessages$.next(errorMessage);
  }
}
