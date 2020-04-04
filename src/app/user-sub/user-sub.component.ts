import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

import { userMain } from '../models/user-main';

@Component({
  selector: 'app-user-sub',
  templateUrl: './user-sub.component.html',
  styleUrls: ['./user-sub.component.scss']
})
export class UserSubComponent implements OnInit {

    userArray: user[];

    constructor(private auth: LoginService,
      private router: Router) { }

  ngOnInit() {
      console.log('here');
      this.auth.getUserList().subscribe(user => {
        console.log(user);
        this.userArray = user;
      });
  }

}
