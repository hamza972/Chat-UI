import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

    user: firebase.User;

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];

                /* Check if user's role position is admin */
                if (user[0].rolePosition !== 'admin') {
                    this.router.navigate(['/home']);
                }
            }
        })
    }

}
