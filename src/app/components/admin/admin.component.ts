import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
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
        private adminService: AdminService,
        private router: Router
    ) { }

    ngOnInit() {
        this.adminService.get().subscribe(admin => {
            this.admins = admin;
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


