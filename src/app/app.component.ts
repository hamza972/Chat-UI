import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AppUser } from './models/user';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from './services/socketio-adapter';
import { Socket } from 'ng-socket-io';
import { Http } from '@angular/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'meps';

  userId: string;
  username: string;
  user: AppUser;
  public adapter: ChatAdapter;

  constructor(private socket: Socket, private http: Http, private auth: AuthService) {
    this.InitializeSocketListerners();
  }

  ngOnInit() {
    this.auth.getUserData().subscribe(user => {
      if (user === null) {
      } else {
          this.user = user[0];
          this.username = this.user.firstName + ' ' + this.user.lastName;
          this.socket.emit('join', this.username);
      }
    });
  }

  public InitializeSocketListerners(): void {
    this.socket.on('generatedUserId', (userId) => {
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
      this.userId = userId;
    });
  }
}
