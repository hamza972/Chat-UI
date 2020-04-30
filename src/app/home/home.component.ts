import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    user: firebase.User;

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {

        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserState()
        .subscribe(user => {
            if(user === null) {
                this.router.navigate(['/home']);
            }
            this.user = user;
        })
    }

    login() {
        this.router.navigate(['/login']);
    }

    register() {
        console.log('here');
        this.router.navigate(['/registration']);
    }

    logout() {
        this.auth.logout();
    }
}
