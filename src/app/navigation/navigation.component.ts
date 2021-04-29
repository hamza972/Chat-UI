import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/user';
import { Notification } from '../models/notification'
import { Role } from '../models/role';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    user: AppUser;
    private roles: Role[];
    private notifications: Notification[];
    constructor(
        private auth: AuthService,
        private router: Router,
        private roleService: RoleService,
        private notificationService: NotificationService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
            }
            this.Checkrole();
            this.getNotifications();
        });
    }

    showNotifications(){
        console.log(this.notifications);
    }

    getNotifications(){
        this.notificationService.get().subscribe(dbNotifications => {
            this.notifications = this.checkNotifications(dbNotifications);
        });
    }

    checkNotifications(notifications: Notification[]){
        var userNotifications: Notification[] = [];
        console.log(notifications);
        for(var i = 0; i < notifications.length; i++){
            if(notifications[i].role.id == this.user.role.id) {
                userNotifications.push(notifications[i]);
            }
        }
        console.log(userNotifications);
        return userNotifications;
    }

    Checkrole() {    
        this.roleService.get().subscribe(dbRoles => {
        this.roles = dbRoles;
        for (let index = 0; index < this.roles.length; index++) {
            if(this.roles[index].id == this.user.role.id)
            {
                if (this.roleService.Equals(this.roles[index], this.user.role) == false)
                {
                    console.log(this.roles[index]);
                    this.user.role = this.roles[index];
                    this.userService.update(this.user);
                    console.log("Updated User role information");
                    break;
                }
            console.log("User role information is up to date");
            break;
            }
        }
        })
    }  
    login() {
        this.router.navigate(['/login']);
    }

    register() {
        console.log('here');
        this.router.navigate(['/registration']);
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/']);
    }

    getClass = (path) => {
        return (window.location.pathname === path) ? 'active' : '';
    }


}
