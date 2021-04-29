import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Notification } from '../models/Notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class NotificationService {

    notificationCollection: AngularFirestoreCollection<Notification>;
    notification: Observable<Notification[]>;
    notificationDoc: AngularFirestoreDocument<Notification>;

    constructor(public afs: AngularFirestore) {
        this.notificationCollection = this.afs.collection('Notification', ref => ref.orderBy('date', 'desc'));

        this.notification = this.notificationCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Notification;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    get() {
        return this.notificationCollection.valueChanges();
    }

    add(notification: Notification) {
        this.notificationCollection.add(notification).then(doc => {
            notification.id = doc.id;
            this.update(notification);
        });
    }

    delete(notification: Notification) {
        this.notificationDoc = this.afs.doc(`Notification/${notification.id}`);
        this.notificationDoc.delete();
    }

    update(notification: Notification) {
        this.notificationDoc = this.afs.doc(`Notification/${notification.id}`);
        this.notificationDoc.update(notification);
    }
}