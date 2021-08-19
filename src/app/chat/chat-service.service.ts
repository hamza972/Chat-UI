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
    return this.firestore.collection("users").get()
  //   debugger
  //   if(snapshot.empty){
  //     return null
  //   }
  //   const list: MUser[] = [];
  //   snapshot.docs.forEach(item => {
  //     const data: any = item.data();
  //     list.push({id: item.uid, name: `${data.firstName} ${data.lastName}`, email: data.email, online: false})
  //   });
  //   console.log(list)
  //   return list;
  }

}
