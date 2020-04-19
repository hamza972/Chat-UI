import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
    roles: Role[];
    editState: boolean = false;
    roleToEdit: Role;

    constructor(
        private roleService: RoleService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.roleService.get().subscribe(role => {
            this.roles = role;
        });
    }

    add() {
        this.router.navigate(['/role-add']);
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
