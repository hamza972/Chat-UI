import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../models/participant';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  participants: Participant[];
  editState: boolean = false;
  participantToEdit: Participant;
  user: firebase.User;

  constructor(
    private auth: AuthService,
    private participantService: ParticipantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.getUserData().subscribe(user => {
      if(user === null) {
          this.router.navigate(['/home']);
      } else {
          this.user = user[0];
      }
      
      this.participantService.get().subscribe(participant => {
        this.participants = participant;
    });
  })
  }

}
