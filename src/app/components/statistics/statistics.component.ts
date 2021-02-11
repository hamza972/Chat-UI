import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { AppUser } from '../../models/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  participants: AppUser[];
  editState = false;
  participantToEdit: AppUser;
  user: firebase.User;

  constructor(
    private participantService: ParticipantService
  ) { }

  ngOnInit(): void {
      this.participantService.get().subscribe(participant => {
        this.participants = participant;
    });
  }

}
