import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/user';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { ChatServiceService } from './chat-service.service';
import { MUser, MChatMessage, MChatRoom } from './models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

user$: Observable<AppUser>;
userList: MUser[] = [];
currentUser: MUser = null
chatRoomsList: MChatRoom[] = []
selectedUser: MUser = null
messageTxt: string = ""
currentChatRoom: MChatRoom = null;

constructor(private auth: LoginService,
            private router: Router,
            private chatService: ChatServiceService) { }
  ngOnInit() {
    this.user$ = this.auth.user$;
    this.user$.subscribe(res => {
      this.currentUser = {email: res.email, id: res.id, name: `${res.firstName} ${res.lastName}`}
      this.getChatRooms(res.id)
      this.getAllUsers(res.id)
    })
    
  }

  getAllUsers(currentUserId){
    this.chatService.getAllUsers().subscribe((snapshot) => {
      if (snapshot.empty) {
        return null;
      }
      const list: MUser[] = [];
      snapshot.docs.forEach((item) => {
        const data: any = item.data();
        if(item.id !== currentUserId){
          list.push({
            id: item.id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            online: false,
          });
        }
      });
      this.userList = list;
    });
  }

  getChatRooms(userId){
    this.chatService.getChatRooms(userId).subscribe(async (snapshot) => {
      if (!snapshot || snapshot.length == 0) {
        return null;
      } else {
        const l = []
        for(let i = 0; i < snapshot.length; i++){
          const item  = snapshot[i]
          const users = item.members;
          const findIndex = users.findIndex((a) => a !== userId);
          const res = await this.chatService.getUserById(users[findIndex])
          const room: MChatRoom = {id: item.id, user: res, members: item.members, lastUpdate: item.lastUpdate}
          l.push(room)
        }
        this.chatRoomsList = l;
        this.currentChatRoom = l[0];
        this.getChatRoomMessages();
      }
      
    })
  }

  setSelectedUser(usr) {
    this.selectedUser = usr
  }

  onMessageChange(){
    if(!this.messageTxt){
      return;
    }
    const findIndex = this.chatRoomsList.findIndex(a => a.user.id === this.selectedUser.id);
    if(findIndex < 0) {
      this.chatService.createChatRoom(this.messageTxt, this.selectedUser.id, this.currentUser.id)
    } else {
      this.chatService.sendMessage(this.messageTxt, this.currentUser.id, this.currentChatRoom.id)
    }
  }

  getChatRoomMessages(){
    this.chatService.getChatRoomMessage(this.currentChatRoom.id).subscribe(res=>{
      console.log(res);
    })
  }

}
