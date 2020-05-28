import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Report } from '../shared/models/report';
import { TimeInfo } from '../shared/models/timeInfo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  protected readonly USERS_COLLECTION = 'users';
  protected readonly REPORTS_COLLECTION = 'reports';
  public isLoading$ = new BehaviorSubject<boolean>(true);

  get timestamp() {
    return new Date().getTime();
  }
  constructor(private afDb: AngularFirestore, private auth: AuthService) {}

  getUserReportsCollection(): AngularFirestoreCollection<Report> {
    return this.afDb.collection<Report & TimeInfo>(`${this.USERS_COLLECTION}/${this.auth.id}/${this.REPORTS_COLLECTION}`, (ref) =>
      ref.orderBy('updated_at', 'desc')
    );
  }

  addReport(report: Report): Promise<DocumentReference> {
    const data: Report & TimeInfo = { ...report, created_at: this.timestamp, updated_at: this.timestamp };
    return this.getUserReportsCollection().add(data); //fix types from  angular firestore
  }

  editReport(report: Report): Promise<void> {
    return this.getUserReportsCollection()
      .doc(report.id)
      .update({
        ...report,
        updated_at: this.timestamp,
      });
  }

  deleteReport(id: string): Promise<void> {
    return this.getUserReportsCollection().doc(id).delete();
  }

  getReport(id: string): Observable<Report> {
    return this.getUserReportsCollection()
      .doc<Report>(id)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          const data = snapshot.payload.data();
          const id = snapshot.payload.id;
          return { id, ...data };
        })
      );
  }

  getReports(): Observable<Report[]> {
    return this.getUserReportsCollection()
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        }),
        tap((raports) => {
          this.isLoading$.next(false);
        }),
        catchError((e) => throwError(e))
      );
  }
}
