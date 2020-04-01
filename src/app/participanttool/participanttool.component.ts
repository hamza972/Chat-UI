import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { role } from '../models/role';

@Component({
  selector: 'app-participanttool',
  templateUrl: './participanttool.component.html',
  styleUrls: ['./participanttool.component.scss']
})
export class ParticipanttoolComponent implements OnInit {

  authError: any; 
  roleArray: role[];

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

  createParticipantUser(frm) { 
    this.auth.createParticipantUser(frm.value);
  }
}
