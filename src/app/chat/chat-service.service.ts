import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { MUser, MChatMessage, MChatRoom } from './models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private firestore: AngularFirestore) { }

  getAllUsers(): Observable<any>{
    return this.firestore.collection("Users").get()
  }

}
