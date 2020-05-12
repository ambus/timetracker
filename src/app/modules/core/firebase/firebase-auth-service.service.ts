import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthServiceService {
  public authErrorMessages$ = new Subject<string>();
  public isLoading$ = new BehaviorSubject<boolean>(true);
  public user$ = new Subject<User>();

  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn().subscribe();
  }

  private isLoggedIn() {
    return this.afAuth.authState.pipe(
      first(),
      tap((user) => {
        this.isLoading$.next(false);
        if (user) {
          const { email, uid } = user;
          this.user$.next({ email, uid });
        }
      })
    );
  }

  public signUpFirebase({ email, password }: LoginCredentials) {
    this.isLoading$.next(true);
    this.handleErrorOrSuccess(() => {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    });
  }

  public loginFirebase({ email, password }: LoginCredentials) {
    this.isLoading$.next(true);
    this.handleErrorOrSuccess(() => {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    });
  }

  public logOutFirebase(): Promise<void> {
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
      });
  }

  private handleErrorOrSuccess(
    cb: () => Promise<firebase.auth.UserCredential>
  ) {
    cb()
      .then((data) => this.authenticalUser(data))
      .catch((e) => this.handleSignUpLoginError(e));
  }

  private authenticalUser(userCredential: { user: User }) {
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

interface User {
  email: string;
  uid: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}
