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
userList: MUser[] = []

constructor(private auth: LoginService,
            private router: Router,
            private chatService: ChatServiceService) { }
  ngOnInit() {
    this.user$ = this.auth.user$;
    this.chatService.getAllUsers().subscribe(snapshot => {
      debugger;
    if(snapshot.empty){
      return null
    }
    const list: MUser[] = [];
    snapshot.docs.forEach(item => {
      const data: any = item.data();
      list.push({id: item.uid, name: `${data.firstName} ${data.lastName}`, email: data.email, online: false})
    });
    console.log(list)
    this.userList = list;
    })
  }

}
