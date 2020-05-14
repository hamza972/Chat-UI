import { Component } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { appUser } from './models/user';
import { ChatAdapter } from 'ng-chat';
import { SocketIOAdapter } from './services/socketio-adapter'
import { Socket } from 'ng-socket-io';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meps';

  userId: string;
  username: string;

  public adapter: ChatAdapter;

  constructor(private socket: Socket, private http: Http) {
    this.InitializeSocketListerners();  
  }

  public joinRoom(): void 
  {
    this.socket.emit("join", this.username);
  }

  public InitializeSocketListerners(): void
  {
    this.socket.on("generatedUserId", (userId) => {
      // Initializing the chat with the userId and the adapter with the socket instance
      this.adapter = new SocketIOAdapter(userId, this.socket, this.http);
      this.userId = userId;
    });
  }
}
