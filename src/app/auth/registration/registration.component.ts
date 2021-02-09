import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    authError: any;

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.auth.eventAuthError$.subscribe( data => {
            this.authError
        })
    }

    create(frm) {
        //frm.value.systemRole = frm.value.syr == "cc" ? "control" : "participant";
        frm.value.systemRole = "control";
        frm.value.isOwner = false;
        console.log(frm.value);
        this.auth.createUser(frm.value);
    }

    cancel() {
        this.router.navigate(['/home']);
    }
}
