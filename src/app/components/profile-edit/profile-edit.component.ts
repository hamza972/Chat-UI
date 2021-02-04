import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { Affiliate } from '../../models/affiliate';
import { RoleService } from '../../services/role.service';
import { AffiliateService } from '../../services/affiliate.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as Editor from '../../../assets/custom-ckeditor/ckeditor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Participant } from '../../models/participant';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  roleID: string;
  user: Participant;
  role: Role;
  public Editor = Editor;
  editorConfig = {
      toolbar: {
        items: [
          'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList',
          '|', 'indent', 'outdent', '|', 'blockQuote', 'imageUpload', 'mediaEmbed', 'undo', 'redo' ]
      },
      image: {
        toolbar: [
          'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight' ],
        styles: [
          'alignLeft', 'alignCenter', 'alignRight'],
      },
      language: 'en'
  };
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

    if (this.user.roleID !== this.roleID || this.user.systemRole !== 'admin') {
      // user is not and admin nor playing the role of this profile
      this.router.navigate(['/profile', this.roleID]);
    }

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
