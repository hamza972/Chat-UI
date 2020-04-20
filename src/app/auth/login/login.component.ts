import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    authError: any;

    constructor(private auth: LoginService) {

    }

    ngOnInit() {
        this.auth.eventAuthError$.subscribe( data=> {
            this.authError = data;
        })
    }

    login(frm) {
        this.auth.login(frm.value.email, frm.value.password);
    }
}
