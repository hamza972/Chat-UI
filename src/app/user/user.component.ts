import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

import { Role } from '../models/role';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    roleArray: Role[];

    constructor(private auth: LoginService,
      private router: Router) { }

  ngOnInit() {
      console.log('here');
      this.auth.getRoles().subscribe(roles => {
        console.log(roles);
        this.roleArray = roles;
      });
  }

  createUser(frm) {
      console.log(frm.value);
      //this.auth.createUser(frm.value);
  }

}
