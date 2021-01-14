import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from '../models/user';
import { Role } from '../models/role';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-RolePage',
  templateUrl: './RolePage.component.html',
  styleUrls: ['./RolePage.component.scss']
})
export class RolePageComponent implements OnInit {
  user$: Observable<AppUser>;
  roles: Role[];
  user: firebase.User;
  constructor(
    private auth: AuthService,
    private roleService: RoleService,
    private router: Router) { }

  ngOnInit() {
    /* Check if user is signed in, otherwise redirect to home */
    this.auth.getUserData().subscribe(user => {
      if (user === null) {
          this.router.navigate(['/home']);
      } else {
          this.user = user[0];
      }
  });

    this.roleService.get().subscribe(dbRoles => {
                                  this.roles = dbRoles;
    });
  }
}
