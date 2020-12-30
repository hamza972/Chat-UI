import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { Affiliate } from '../../models/affiliate';
import { RoleService } from '../../services/role.service';
import { AffiliateService } from '../../services/affiliate.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as Editor from '@ckeditor/ckeditor5-build-classic';
import Base64Plugin from '../../email/email-compose/Base64Upload.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  roleID: string;
  user: firebase.User;
  role: Role;
  public Editor = Editor;
  editorConfig =  {extraPlugins: [Base64Plugin]};
  affiliates: Affiliate[];
  authError: any;

  // storageRef = firebase.storage().ref();
  constructor(
    private auth: AuthService,
    private roleService: RoleService,
    private sr: DomSanitizer,
    private affiliateService: AffiliateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public htmlProperty(str: string): SafeHtml {
    return this.sr.bypassSecurityTrustHtml(str);
  }

  ngOnInit() {
    /* Check if user is signed in, otherwise redirect to home */
    this.auth.getUserData().subscribe(user => {
      if (user === null) {
        this.router.navigate(['/home']);
      } else {
        this.user = user[0];
      }
    });

    this.roleID = this.route.snapshot.paramMap.get('id');

    this.roleService.getRole(this.roleID).subscribe(rolesFromDB => {
      this.role = rolesFromDB;
    });

    this.affiliateService.get().subscribe(affiliate => {
      console.log(affiliate);
      this.affiliates = affiliate;
    });
  }

  update(editedRole) {
    if (editedRole.title !== '') {
      editedRole.id = this.roleID;
      this.roleService.update(editedRole);
      this.router.navigate(['/control']);
    }
  }

  cancel() {
    this.router.navigate(['/control']);
  }

  uploadAvatar() {
    alert('Upload image not implemented');
  }
}
