import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { newsClass } from '../models/newsClass';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    newsCollection: AngularFirestoreCollection<newsClass>;
    news: Observable<newsClass[]>;
    newsDoc: AngularFirestoreDocument<newsClass>;

    constructor(public afs: AngularFirestore) {
        //this.items = this.afs.collection('items').valueChanges();

        this.newsCollection = this.afs.collection('News', ref => ref.orderBy('newsDate', 'desc'));

        this.news = this.newsCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as newsClass;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    get() {
        return this.newsCollection.valueChanges();
    }

    add(news: newsClass) {
        this.newsCollection.add(news);
    }

    delete(news: newsClass) {
        this.newsDoc = this.afs.doc(`News/${news.id}`);
        this.newsDoc.delete();
    }

    update(news: newsClass) {
        this.newsDoc = this.afs.doc(`News/${news.id}`);
        this.newsDoc.update(news);
    }
}
