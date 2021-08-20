import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/user';
import { Notification } from '../models/notification'
import { Role } from '../models/role';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    user: AppUser;
    private roles: Role[];
    private notifications: Notification[] = [];
    constructor(
        private auth: AuthService,
        private router: Router,
        private roleService: RoleService,
        private notificationService: NotificationService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        
    }

}
