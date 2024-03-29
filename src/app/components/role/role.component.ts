import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { AppUser } from '../../models/user';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
    roles: Role[];
    editState = false;
    roleToEdit: Role;

    constructor(
        private roleService: RoleService,
        private router: Router
    ) {}

    ngOnInit(): void {
        /* Get list of roles */
        this.roleService.get().subscribe(dbRoles => {
            this.roles = dbRoles;
            console.log(this.roles);
        });
    }

    returnRoles() {
        return this.roles;
    }

    add() {
        this.router.navigate(['/role-add']);
    }
}
