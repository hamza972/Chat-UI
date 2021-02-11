import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantService } from '../../services/participant.service';
import { AppUser } from '../../models/user';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})

export class ParticipantComponent implements OnInit {
    participants: AppUser[];
    editState = false;
    participantToEdit: AppUser;
    roles: Role[];

    constructor(
        private participantService: ParticipantService,
        private roleService: RoleService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.participantService.get().subscribe(participant => {
            this.participants = participant;
        });

        this.roleService.get().subscribe(role => {
            this.roles = role;
        });
    }

    add() {
        this.router.navigate(['/participant-add']);
    }

    delete($event, participant: AppUser) {
        this.participantService.delete(participant);
    }
}