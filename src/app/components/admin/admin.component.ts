import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AppUser } from '../../models/user';

@Component({
    selector: 'app-owner',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    @Input() user: AppUser;
    admins: AppUser[];
    editState = false;
    ownerToEdit: AppUser;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.userService.getAdmins().subscribe((admins) => {
            this.admins = admins;
          });
    }

    delete(admin: AppUser) {
        this.clearState();
        throw Error ('Delete admin not implemented.');
    }

    add() {
        this.router.navigate(['/admin-add']);
    }

    clearState() {
        this.editState = false;
        this.ownerToEdit = null;
    }
 }


