import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../models/participant';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})

export class ParticipantComponent implements OnInit {
    participants: Participant[];
    editState = false;
    participantToEdit: Participant;
    user: firebase.User;
    roles: Role[];

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
            }
        });

        this.participantService.get().subscribe(participant => {
            this.participants = participant;
        });

        this.roleService.get().subscribe(role => {
            this.roles = role;
        });
    }

    // add() {
    //     this.router.navigate(['/participant-add']);
    // }


    // delete($event, participant: Participant) {
    //     this.participantService.delete(participant);
    // }

    /*
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
