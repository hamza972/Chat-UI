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

    participant: Participant = {
        firstName: "",
        password: ""
    };
    roles: Role[];
    editState: boolean = false;
    participantToEdit: Participant;
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
            if(user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
            }
        })

        this.roleService.get().subscribe(role => {
            console.log(role);
            this.roles = role;
        });
    }

    selectionChanged(event) {
        this.roleDetails = event.target.value.split("|");
        console.log(this.roleDetails);
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    add() {
        if(this.participant.email != '') {
            this.participant.roleAffiliation = this.roleDetails[3];
            this.participant.systemRole = "participant";
            this.participantService.add(this.participant);
            this.router.navigate(['/control']);
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

}
