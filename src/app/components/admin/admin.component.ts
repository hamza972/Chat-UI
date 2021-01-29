import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { AppUser } from '../../models/user';



@Component({
    selector: 'app-owner',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    admins: AppUser[];
    editState: boolean = false;
    isOwner: boolean = false;
    ownerToEdit: AppUser;
    user: firebase.User;

    constructor(
        private auth: AuthService,
        private AdminService: AdminService,
        private router: Router
    ) { }

    ngOnInit() {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if(user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];

                /* Check if user's role position is admin */
                // if(user[0].rolePosition != "admin" && user[0].IsOwner != "true"){
                    
                //     this.router.navigate(['/home']);
               
               // }
            }
        })
        this.AdminService.get().subscribe(admin => {
            this.admins = admin;
        });

    }

    deleteItem($event, admin: AppUser) {
        this.clearState();
        this.AdminService.delete(admin);
    }

    edit($event, admin: AppUser) {
        this.editState = true;
        this.ownerToEdit = admin;
    }

    updateItem(admin: AppUser) {
        this.AdminService.update(admin);
        this.clearState();
    }

    clearState() {
        this.editState = false;
        this.ownerToEdit = null;
    }   
 }


