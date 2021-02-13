import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    roleID: string;
    user: firebase.User;
    role: Role;

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
            }
        });

        this.roleID = this.route.snapshot.paramMap.get('id');

        this.roleService.getRole(this.roleID).subscribe( roleFromDB => {
            this.role = roleFromDB;
        });
    }
}
