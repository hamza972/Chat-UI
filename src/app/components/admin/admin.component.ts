import { Component, OnInit, Input } from '@angular/core';
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
        private adminService: AdminService
    ) { }

    ngOnInit() {
        this.adminService.get().subscribe(admin => {
            this.admins = admin;
        });
    }

    delete($event, admin: AppUser) {
        this.clearState();
        this.adminService.delete(admin);
    }

    edit($event, admin: AppUser) {
        this.editState = true;
        this.ownerToEdit = admin;
    }

    updateItem(admin: AppUser) {
        this.adminService.update(admin);
        this.clearState();
    }

    clearState() {
        this.editState = false;
        this.ownerToEdit = null;
    }
 }


