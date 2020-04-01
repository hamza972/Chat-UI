import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  authError: any; 

  constructor(private auth: LoginService) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data =>{
      this.authError = data;
    })
  }

  createControlUser(frm) { 
    this.auth.createControlUser(frm.value);
  }
}
