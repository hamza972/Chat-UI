import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Participant } from '../../models/participant';
import { Role } from '../../models/role';
import { Affiliate } from '../../models/affiliate';
import { RoleService } from '../../services/role.service';
import { AffiliateService } from '../../services/affiliate.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import * as Editor from '../../../assets/custom-ckeditor/ckeditor';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { StorageService } from '../../services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  roleID: string;
  user: Participant;
  role: Role;
  affiliates: Affiliate[];
  authError: any;
  selectedImage: any = null;
  uploadImageUrl: string;
  uploadImageFile: string;

  public Editor = Editor;
  editorConfig = {
    toolbar: {
      items: [
        'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList',
        '|', 'indent', 'outdent', '|', 'blockQuote', 'imageUpload', 'mediaEmbed', 'undo', 'redo']
    },
    image: {
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'],
    },
    language: 'en'
  };

  imageDisplayed: any = ''; // cloud storage url or base64 string
  imageChangedEvent: any = '';
  croppedImage: any = ''; // cropped event file
  imageHasChanged = false;
  imageConfirmed = false;
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageHasChanged = true;
    this.imageConfirmed = false;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.imageHasChanged = true;
    // show cropper
  }
  undoImage() {
    this.imageDisplayed = this.role.avatar;
    this.imageConfirmed = false;
  }
  confirmImage() {
    this.imageDisplayed = this.croppedImage;
    this.imageHasChanged = false;
    this.imageConfirmed = true;
  }
  cancelImage() {
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.imageHasChanged = false;
  }

  constructor(
    private auth: AuthService,
    private roleService: RoleService,
    @Inject(StorageService) private storageService: StorageService,
    private sr: DomSanitizer,
    private affiliateService: AffiliateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

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
      this.imageDisplayed = this.role.avatar;
    });

    this.affiliateService.get().subscribe(affiliate => {
      this.affiliates = affiliate;
    });
  }

  async update(editedRole) {
    if (editedRole.title !== '') {
      editedRole.id = this.roleID;
      // update avatar if we have an image confirmed
      if (this.imageConfirmed) {
        this.selectedImage = base64ToFile(this.croppedImage);
        const url = await this.storageService.uploadAvatar(this.roleID, this.selectedImage);
        this.uploadImageUrl = url;
        editedRole.avatar = this.uploadImageUrl;
      }
      this.roleService.update(editedRole);
      this.router.navigate(['/control']);
    }
  }

  cancel() {
    this.router.navigate(['/control']);
  }
}