import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent {
  title = 'TimeTracker';
  notes$: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.notes$ = db.collection('notes').valueChanges();
  }
}
