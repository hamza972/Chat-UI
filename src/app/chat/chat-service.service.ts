import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { MUser, MChatMessage, MChatRoom } from './models';
import { AngularFireDatabase} from "@angular/fire/database"
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private firestore: AngularFirestore, private database: AngularFireDatabase) { }

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
    }).then(()=>{
      this.updateChatRoom( chatRoom, { lastUpdate: new Date() } )
    })
  }

  getChatRoomMessage(chatRoom: string){
    const path = `ChatRooms/${chatRoom}/messages`;
    return this.firestore.collection(path, ref => ref.orderBy("time", "asc")).valueChanges({ idField: 'messageId' });
  }

  updateChatRoom<T>( chatRoomId: string, value: object ): Promise<void> {
		return this.firestore.collection( "ChatRooms" ).doc( chatRoomId ).update( value );
	}

  getUserStatus(){
    return this.database.object("status").valueChanges()
  }

  deleteMessage(chatRoomId: string, messageId) {
    const path = `ChatRooms/${chatRoomId}/messages/${messageId}`;
    this.firestore.collection("ChatRooms").doc(chatRoomId).collection("messages").doc(messageId).delete()
  }
}
