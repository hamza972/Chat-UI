import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Tweet } from '../models/tweet';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TweetService {

    tweetCollection: AngularFirestoreCollection<Tweet>;
    tweets: Observable<Tweet[]>;
    tweetDoc: AngularFirestoreDocument<Tweet>;

    constructor(public afs: AngularFirestore) {
        this.tweetCollection = this.afs.collection('Tweets', ref => ref.orderBy('date', 'desc'));

        this.tweets = this.tweetCollection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const data = a.payload.doc.data() as Tweet;
                data.id = a.payload.doc.id;
                return data;
            });
        }));
    }

    get() {
        return this.tweetCollection.valueChanges();
    }

    add(tweet: Tweet) {
        this.tweetCollection.add(tweet);
    }

    delete(tweet: Tweet) {
        this.tweetDoc = this.afs.doc('Tweet/' + tweet.id);
        this.tweetDoc.delete();
    }

    update(tweet: Tweet) {
        this.tweetDoc = this.afs.doc('Tweet/' + tweet.id);
        this.tweetDoc.update(tweet);
    }
}
