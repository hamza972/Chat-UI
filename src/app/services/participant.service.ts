import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AppUser } from '../models/user';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ParticipantService {

    participantCollection: AngularFirestoreCollection<AppUser>;
    participant: Observable<AppUser[]>;
    participantDoc: AngularFirestoreDocument<AppUser>;

    constructor(
        public afs: AngularFirestore,
        private auth: AuthService
    ) {
        this.participantCollection = this.afs.collection('Users/Participants/All', ref => ref.orderBy('firstName', 'asc'));
    }

    get() {
        return this.participantCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as AppUser;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    add(participant: AppUser) {
        console.log('participantService', participant);
        return this.auth.createUser(participant);
    }

    delete(participant: AppUser) {
        this.participantDoc = this.afs.doc('Users/${participant.id}');
        this.participantDoc.delete();
    }

    update(participant: AppUser) {
        this.participantDoc = this.afs.doc('Users/${participant.id}');
        this.participantDoc.update(participant);
    }
}
