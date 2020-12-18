import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { Participant } from '../../models/participant';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    userID: string;
    user: firebase.User;
    role: Role = { firstName: '' };

    constructor(
        private auth: AuthService,
        private roleService: RoleService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
                console.log('this.user');
                console.log(this.user);
            }
        });

        this.userID = this.route.snapshot.queryParamMap.get('id');

        this.route.paramMap.subscribe(params => {
            this.userID = params.get('id');
        });

        this.getRole(this.userID);
    }

    getRole(userID) {
        this.roleService.profile(userID).subscribe(role => {
            this.role = role;
        });
    }

}
