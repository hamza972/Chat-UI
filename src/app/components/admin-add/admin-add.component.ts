import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../../models/user';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {
  admin: AppUser = {};
  editState = false;
  user: AppUser;

  constructor(
      private authService: AuthService,
      private router: Router
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
          }
      });
  }

  cancel() {
      this.router.navigate(['/control']);
  }

  add() {
    if (this.admin.email !== undefined) {
      this.admin.systemRole = 'admin';
      this.authService.createUser(this.admin)
      .catch(error => {
          alert(error.message);
      });
      this.router.navigate(['/control']);
    }
  }
}
