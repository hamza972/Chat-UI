import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OwnerService } from '../../services/owner.service';
import { Owner } from '../../models/owner';



@Component({
    selector: 'app-owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

    admins: Owner[];
    editState: boolean = false;
    isOwner: boolean = false;
    ownerToEdit: Owner;
    user: firebase.User;

    constructor(
        private auth: AuthService,
        private ownerService: OwnerService,
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
                if(user[0].rolePosition != "admin" && user[0].IsOwner != "true"){
                    
                    this.router.navigate(['/home']);
               
                }
            }
        })
        this.ownerService.get().subscribe(admin => {
            this.admins = admin;
        });

    }

    deleteItem($event, admin: Owner) {
        this.clearState();
        this.ownerService.delete(admin);
    }

    edit($event, admin: Owner) {
        this.editState = true;
        this.ownerToEdit = admin;
    }

    updateItem(admin: Owner) {
        this.ownerService.update(admin);
        this.clearState();
    }

    clearState() {
        this.editState = false;
        this.ownerToEdit = null;
    }   
 }


