import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../models/Participant';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
    participants: Participant[];
    editState: boolean = false;
    participantToEdit: Participant;

    constructor(
        private participantService: ParticipantService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.participantService.get().subscribe(participant => {
            this.participants = participant;
        });
    }

    add() {
        this.router.navigate(['/participant-add']);
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
