import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Participant } from '../models/participant';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    user: Participant = { rolePosition: ""};

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if(user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
            }
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
        this.router.navigate(['/home']);
    }

    getClass = function (path) {
        return (window.location.pathname == path) ? 'active' : '';
    }
}
