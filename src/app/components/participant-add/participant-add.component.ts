import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ParticipantService } from '../../services/participant.service';
import { RoleService } from '../../services/role.service';
import { Participant } from '../../models/participant';
import { Role } from '../../models/role';

@Component({
    selector: 'app-participant-add',
    templateUrl: './participant-add.component.html',
    styleUrls: ['./participant-add.component.scss']
})
export class ParticipantAddComponent implements OnInit {

    participant: Participant;
    roles: Role[];
    editState = false;
    roleDetails: Array<string>;
    user: firebase.User;
    authError: any;

    constructor(
        private auth: AuthService,
        private participantService: ParticipantService,
        private roleService: RoleService,
        private router: Router
    ) {}

    ngOnInit(): void {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
                /* Check if user's role position is admin */
                if (user[0].systemRole !== 'admin') {
                    this.router.navigate(['/home']);
                }
            }
        });

        this.roleService.get().subscribe(dbRoles => {
            this.roles = dbRoles;
        });
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    add(participant: Participant) {
        console.log('participant', participant);
        const deakinEmailRgx = new RegExp('@deakin.edu.au$');
        if (participant.email !== null) {
            if (deakinEmailRgx.test(participant.email)) {
                const task = this.roleService.getRole(participant.roleID).subscribe(dbRole => {
                    const role: Role = dbRole;
                    console.log('dbRole', dbRole);
                    console.log('role', role);
                    participant.roleFirstName = role.firstName;
                    participant.roleLastName = role.lastName;
                    participant.roleAffiliation = role.affiliation;
                    participant.systemRole = 'participant';
                    this.participantService.add(participant);
                    this.router.navigate(['/control']);
                }).unsubscribe();
            } else {
                alert('Invalid email entry.');
            }
        } else {
            alert('Error.');
        }
    }

    /*
    deleteItem($event, participant: Participant) {
        this.clearState();
        this.participantService.deleteItem(item);
    }

    edit($event, participant: Participant) {
        this.editState = true;
        this.participantToEdit = item;
    }

    updateItem(participant: Participant) {
        this.participantService.updateItem(item);
        this.clearState();
    }

    clearState() {
        this.editState = false;
        this.participantToEdit = null;
    }
    */
    //

}
