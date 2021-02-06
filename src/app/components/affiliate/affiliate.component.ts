import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/affiliate';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
    selector: 'app-affiliate',
    templateUrl: './affiliate.component.html',
    //template: '<app-affiliate-edit [affiliateToEdit]="this.affiliateToEdit"></app-affiliate-edit>',
    styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent implements OnInit {
    affiliates: Affiliate[];
    user: firebase.User;
    editState = false;
    affiliateToEdit: Affiliate;

    constructor(
        private auth: AuthService,
        private affiliateService: AffiliateService,
        private router: Router,
        public afs: AngularFirestore
    ) {}

    ngOnInit(): void {

        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
                /* Check if user's role position is control */
                if (user[0].systemRole !== 'admin') {
                    this.router.navigate(['/home']);
                }
            }
        });

        /* Get list of affiliates */
        this.affiliateService.get().subscribe(dbAffiliates => {
            this.affiliates = dbAffiliates;
        });
    }

    add() {
        this.router.navigate(['/affiliate-add']);
        this.clearState();
    }

    edit($event, affiliate: Affiliate) {
        this.editState = true;
        this.affiliateToEdit = affiliate;
        this.router.navigate(['/affiliate-edit']);
    }

    update(affiliate: Affiliate) {
        this.affiliateService.update(affiliate);
        this.clearState();
    }

    clearState() {
        this.editState = false;
        this.affiliateToEdit = null;
    }

    delete(affiliateId) {
        this.afs.collection('Affiliates').doc(affiliateId).delete();
    }

}
