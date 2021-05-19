import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/user';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
//import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  admin: AppUser = {};
  editState = false;
  user: AppUser;
  roles: Role[];


  constructor(
      private authService: AuthService,
      private router: Router,
      private roleService: RoleService
  ) {}

  ngOnInit(): void {
      /* Check if user is signed in, otherwise redirect to home */
      this.authService.getUserData().subscribe(user => {
          if (user === null) {
              this.router.navigate(['/home']);
          } else {
              this.user = user[0];
              /* Check if user's role position is admin */
              if (user[0].systemRole !== 'admin') {
                  this.router.navigate(['/home']);
              }
              this.roleService.get().subscribe(dbRoles => {
              this.roles = dbRoles;
            });
          }
      });
  }

  cancel() {
      this.router.navigate(['/control']);
  }

  add() {
    var controlRole;
    if (this.admin.email !== undefined) {
      for (var i = 0; this.roles.length > i; i++){
        if (this.roles[i].firstName == 'Control'){
          controlRole = this.roles[i];
        }
      }
      this.admin.role = controlRole;
      this.admin.systemRole = 'admin';
      this.authService.createUser(this.admin)
      .catch(error => {
          alert(error.message);
      });
    }
    this.router.navigate(['/control']);
  }
}
