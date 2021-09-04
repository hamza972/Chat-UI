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
messagesList: MChatMessage[] = []
userStatus: {} = {};

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
    this.chatService.getUserStatus().subscribe(resp => {
      console.log(resp);
      this.userStatus = resp
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
          const room: MChatRoom = {id: item.roomId, user: res, members: item.members, lastUpdate: item.lastUpdate}
          l.push(room)
        }
        this.chatRoomsList = l;
        if(!this.currentChatRoom){
          this.currentChatRoom = l[0];
          this.selectedUser = l[0].user;
          this.getChatRoomMessages();
        }
      }
    })
  }

  setSelectedUser(usr) {
    this.selectedUser = usr
    // check if has a chatRoom
    const index = this.chatRoomsList.findIndex(item => item.members.includes(usr.id))
    if(index >= 0){
      this.currentChatRoom = this.chatRoomsList[index]
      this.getChatRoomMessages()
    }else {
      this.messagesList = []
      this.currentChatRoom = null
    }
  }

  onSendMessage(){
    if(!this.messageTxt){
      return;
    }
    const findIndex = this.chatRoomsList.findIndex(a => this.selectedUser && a.user.id === this.selectedUser.id);
    if(findIndex < 0) {
      this.chatService.createChatRoom(this.messageTxt, this.selectedUser.id, this.currentUser.id)
    } else {
      const room: MChatRoom = this.chatRoomsList[findIndex]
      this.chatRoomsList.splice(findIndex, 1)
      this.chatRoomsList = [room, ...this.chatRoomsList];
      this.chatService.sendMessage(this.messageTxt, this.currentUser.id, this.currentChatRoom.id)
    }
    this.messageTxt = ""
  }

  goToBottom(){
    const elem = document.getElementById("chat-container")
    elem.scrollTo(0,elem.scrollHeight);
  }

  getChatRoomMessages(){
    this.messagesList = []
    this.chatService.getChatRoomMessage(this.currentChatRoom.id).subscribe((res: any)=>{
      const l: MChatMessage[] = []
      for(let i = 0; i < res.length; i++){
        const item: any = res[i]
        const msg: MChatMessage = {sender: item.sender, date: item.time, message: item.messageTxt}
        l.push(msg)
      }
      const element = document.getElementById("chat");
      // element.scrollTop = element.scrollHeight
      this.messagesList = l;
      setTimeout(()=>{
        this.goToBottom()
      },200)
    })
  }

  setChatRoom(chatRoom: MChatRoom){
    this.selectedUser = chatRoom.user;
    this.currentChatRoom = chatRoom;
    this.getChatRoomMessages()
  }
  onClickEnter($event){
    if($event.key === "Enter"){
      this.onSendMessage()
    }
  }

  getStatus(uid){
    if(this.userStatus[uid]){
      return this.userStatus[uid].status
    }
    return "offline"
  }
}
