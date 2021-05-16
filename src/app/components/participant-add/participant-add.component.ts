import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { AppUser } from '../../models/user';
import { Role } from '../../models/role';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
    selector: 'app-participant-add',
    templateUrl: './participant-add.component.html',
    styleUrls: ['./participant-add.component.scss']
})
export class ParticipantAddComponent implements OnInit {

    participant: AppUser = {};
    roles: Role[];
    editState = false;
    user: firebase.User;
    constructor(
        private authService: AuthService,
        private roleService: RoleService,
        private router: Router
    ) {}

    ngOnInit() {

        /* Check if user is signed in, otherwise redirect to home */
        this.authService.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
                /* Check if user's role position is admin */
                if (user[0].systemRole !== 'admin') {
                    this.router.navigate(['/home']);
                }
            }
            this.getRoles();
        });

    }

    updateSystemRole(){
        var selectBox = document.getElementById("systemRole");
        console.log(selectBox);
    }

    getRoles() {
        this.roleService.get().subscribe(dbRoles => {
            this.roles = dbRoles;
            //console.log(this.roles);
        });
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    add() {
        const deakinEmailRgx = new RegExp('@deakin.edu.au$');
        if (this.participant.email !== undefined) {
            if (deakinEmailRgx.test(this.participant.email)) {
                for (const role of this.roles) {
                    //console.log(this.participant.role);
                    if (this.participant.role == role.id) {
                        console.log(this.participant.role);
                        this.participant.role = role;
                        this.participant.systemRole = 'participant';
                        console.log(this.participant.systemRole);
                        /*this.authService.createUser(this.participant)
                        .catch(error => {
                            alert(error.message);
                        });*/
                        
                    }
                }
                if (this.participant.role.firstName == undefined ) {
                    alert('Issue with role selection');
                }
            } else {
                alert('Invalid Deakin email: ' + this.participant.email);
            }
        } else {
            alert('Error.');
        }
    }
}
