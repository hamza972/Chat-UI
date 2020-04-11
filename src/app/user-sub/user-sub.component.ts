import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

import { userMain } from '../models/user-main';
import { appUser } from '../models/user';

@Component({
  selector: 'app-user-sub',
  templateUrl: './user-sub.component.html',
  styleUrls: ['./user-sub.component.scss']
})
export class UserSubComponent implements OnInit {

    userArray: appUser[];
    userDetails: Array<string>;
    userRole: string;

    constructor(private auth: LoginService,
      private router: Router) { }

  ngOnInit() {
      console.log('here');
      this.auth.getUserList().subscribe(user => {
        console.log(user);
        this.userArray = user;
      });
  }

  selectionChanged(event) {
      this.userDetails = event.target.value.split("|");
  }

  createUser(frm) {
      frm.value.firstName = this.userDetails[0];
      frm.value.lastName = this.userDetails[1];
      frm.value.role = this.userRole;
      console.log(frm.value);
      this.auth.createParticipantUser(frm.value);
  }

}
