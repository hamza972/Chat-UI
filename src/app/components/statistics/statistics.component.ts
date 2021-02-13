import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AppUser } from '../../models/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Input() user: AppUser;
  participants: AppUser[];
  editState = false;
  participantToEdit: AppUser;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
      this.userService.getParticipants().subscribe(participant => {
        this.participants = participant;
    });
  }

}
