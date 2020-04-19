import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    authError: any;

    constructor(private auth: AuthService) { }

    ngOnInit() {
        // this.auth.eventAuthError$.subscribe( data =>{
        //     this.authError = data;
        // })
    }

    create(frm) {
        this.auth.create(frm.value);
    }
}
