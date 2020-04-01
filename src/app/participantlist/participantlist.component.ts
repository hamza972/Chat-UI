import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { appUser } from '../models/user';

@Component({
  selector: 'app-participantlist',
  templateUrl: './participantlist.component.html',
  styleUrls: ['./participantlist.component.scss']
})
export class ParticipantlistComponent implements OnInit {

  userArray: appUser[];
  
  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.auth.getUserList().subscribe(users => {
      console.log(users);
      this.userArray = users;
    });
  }

}
