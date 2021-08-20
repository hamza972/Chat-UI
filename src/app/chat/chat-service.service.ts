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

  getChatRooms( userId: string ): Observable<any> {
		return this.firestore.collection("ChatRooms", ref => ref.where('members', 'array-contains', userId).orderBy("lastUpdate", "desc")).valueChanges();
	}

  async getUserById(userId: string): Promise<MUser> {
    const snapshot = await this.firestore.collection("Users").doc(userId).get().toPromise();
    if(snapshot.exists){
      const data = snapshot.data()
      return {id: snapshot.id, name: `${data.firstName} ${data.lastName}`, email: data.email, }
    }
    return null;
  }

  async createChatRoom(messageTxt, receiver, userId){
    const roomId = this.firestore.createId();
    await this.firestore.collection("ChatRooms").doc(roomId).set({
      lastUpdate: new Date().getTime(),
      members: [userId, receiver],
      roomId,
    });
    this.sendMessage(messageTxt, userId, roomId)
  }

  async sendMessage(messageTxt, sender, chatRoom) {
    const path = `ChatRooms/${chatRoom}/messages`;
    this.firestore.collection(path).add({
      sender,
      messageTxt,
      time: new Date().getTime()
    })
  }

  getChatRoomMessage(chatRoom: string){
    const path = `ChatRooms/${chatRoom}/messages`;
    return this.firestore.collection(path, ref => ref.orderBy("time", "asc")).valueChanges();
  }
}