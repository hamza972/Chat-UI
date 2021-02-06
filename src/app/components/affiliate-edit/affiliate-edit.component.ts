import { Component, Inject, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/affiliate';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-affiliate-edit',
  templateUrl: './affiliate-edit.component.html',
  styleUrls: ['./affiliate-edit.component.scss']
})
export class AffiliateEditComponent implements OnInit {
  @Input() affiliateToEdit: Affiliate;
  user: firebase.User;
  affiliate: Affiliate;
  authError: any;
  affiliateID: string;
  selectedImage: any = null;
  uploadImageUrl: string;
  uploadImageFile: string;

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
    this.imageDisplayed = this.affiliate.avatar;
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
    private affiliateService: AffiliateService,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore,
    @Inject(StorageService) private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    /* Check if user is signed in, otherwise redirect to home */
    this.auth.getUserData().subscribe(user => {
      if (user === null) {
        this.router.navigate(['/home']);
      } else {
        this.user = user[0];
      }
    });
    this.affiliateID = this.route.snapshot.paramMap.get('affiliateID');
    this.affiliateService.getAffiliate(this.affiliateID).subscribe(dbAffiliate => {
      this.affiliate = dbAffiliate;
      this.imageDisplayed = this.affiliate.avatar;
      console.log(this.affiliate);
    });
  }


  async update(editedAffiliate) {
    if (editedAffiliate.title !== '') {
      editedAffiliate.id = this.affiliateID;
      // update avatar if we have an image confirmed
      if (this.imageConfirmed) {
        this.selectedImage = base64ToFile(this.croppedImage);
        const url = await this.storageService.uploadAvatar(this.affiliateID, this.selectedImage);
        this.uploadImageUrl = url;
        editedAffiliate.avatar = this.uploadImageUrl;
      }
      this.affiliateService.update(editedAffiliate);
      this.router.navigate(['/control']);
    }
  }

  cancel() {
    this.router.navigate(['/control']);
  }
}
