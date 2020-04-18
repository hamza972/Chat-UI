import { Component, OnInit } from '@angular/core';
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

    constructor(private participantService: ParticipantService) { }

    ngOnInit(): void {
        this.participantService.get().subscribe(participant => {
            this.participants = participant;
        });
    }

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

}
