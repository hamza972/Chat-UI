import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { country } from '../models/country';
import { role } from '../models/role';
import { appUser } from '../models/user';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  user: firebase.User;
  countryArray: country[];
  roleArray: role[];
  userArray: appUser[];

  constructor(private auth: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.auth.getCountries().subscribe(countries => {
      console.log(countries);
      this.countryArray = countries;
    });
    this.auth.getRoles().subscribe(roles => {
      console.log(roles);
      this.roleArray = roles;
    });
    this.auth.getUserList().subscribe(users => {
      //console.log(users);
      this.userArray = users;
    });

    this.auth.getUserCurrent()
    .subscribe(user => {
    this.user = user;
  })
  }

  goToCountryTool() {
    this.router.navigate(['/countryTool']);
  }

  goToRoleTool() {
    this.router.navigate(['/roleTool']);
  }

  goToParticipantTool() {
    this.router.navigate(['/participantTool']);
  }
}
