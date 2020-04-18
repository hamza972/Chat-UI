import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Role } from '../models/Role';

@Component({
  selector: 'app-participanttool',
  templateUrl: './participanttool.component.html',
  styleUrls: ['./participanttool.component.scss']
})
export class ParticipanttoolComponent implements OnInit {

  authError: any;
  roleArray: Role[];
  roleDetails: Array<string>;

  constructor(private auth: LoginService) { }

  ngOnInit() {
    this.auth.getRoles().subscribe(roles => {
      console.log(roles);
      this.roleArray = roles;
    });
    
    this.auth.eventAuthError$.subscribe( data =>{
      this.authError = data;
    })
  }

  selectionChanged(event) {
      this.roleDetails = event.target.value.split("|");
      //console.log(this.roleDetails);
  }

  createParticipantUser(frm) {
      frm.value.roleFirstName = this.roleDetails[0];
      frm.value.roleLastName = this.roleDetails[1];
      frm.value.rolePosition = this.roleDetails[2];
      frm.value.roleAffiliation = this.roleDetails[3];
      //console.log(frm.value);
      this.auth.createParticipantUser(frm.value);
  }
}
