import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../../services/participant.service';
import { RoleService } from '../../services/role.service';
import { Participant } from '../../models/Participant';
import { Role } from '../../models/Role';

@Component({
    selector: 'app-participant-add',
    templateUrl: './participant-add.component.html',
    styleUrls: ['./participant-add.component.scss']
})
export class ParticipantAddComponent implements OnInit {

    participant: Participant = {
        firstName: ""
    };
    roles: Role[];
    editState: boolean = false;
    participantToEdit: Participant;
    roleDetails: Array<string>;

    constructor(
        private participantService: ParticipantService,
        private roleService: RoleService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.roleService.get().subscribe(role => {
            console.log(role);
            this.roles = role;
        });
    }

    selectionChanged(event) {
        this.roleDetails = event.target.value.split("|");
        //console.log(this.roleDetails);
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    add(form) {
        if(this.participant.email != '') {
            this.participant.roleFirstName = this.roleDetails[0];
            this.participant.roleLastName = this.roleDetails[1];
            this.participant.rolePosition = this.roleDetails[2];
            this.participant.roleAffiliation = this.roleDetails[3];
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
