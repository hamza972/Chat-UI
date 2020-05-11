import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Email } from "../models/email";
import { appUser as User } from "../models/user";
import { LoginService } from "../auth/login.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EmailService {
  emailCollection: AngularFirestoreCollection<Email>;
  email: Observable<Email[]>;
  emailDoc: AngularFirestoreDocument<Email>;

  constructor(public afs: AngularFirestore, public auth: LoginService) {}

  /*getAll() {
    this.emailCollection = this.afs.collection("Emails", (ref) =>
      ref.orderBy("date", "desc")
    );

    this.email = this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.emailCollection.valueChanges();
  }*/

  inbox(user: User) {
    this.emailCollection = this.afs.collection("Emails", (ref) =>
      ref
        .where("to.user", "==", user.email)
        .where("to.deleted", "==", false)
        .where("draft", "==", false)
    );

    this.email = this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.emailCollection.valueChanges();
  }

  sent(user: User) {
    this.emailCollection = this.afs.collection("Emails", (ref) =>
      ref
        .where("from.user", "==", user.email)
        .where("from.deleted", "==", false)
        .where("draft", "==", false)
    );

    this.email = this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.emailCollection.valueChanges();
  }

  drafts(user: User) {
    this.emailCollection = this.afs.collection("Emails", (ref) =>
      ref
        .where("from.user", "==", user.email)
        .where("from.deleted", "==", false)
        .where("draft", "==", true)
    );

    this.email = this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.emailCollection.valueChanges();
  }

  delete(user: User) {
    this.emailCollection = this.afs.collection("Emails", (ref) =>
      ref.where("from.user", "==", user.email).where("to.deleted", "==", true)
    );

    this.email = this.emailCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as Email;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.emailCollection.valueChanges();
  }
}
