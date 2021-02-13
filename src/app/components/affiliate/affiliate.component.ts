import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/affiliate';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-affiliate',
    templateUrl: './affiliate.component.html',
    styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent implements OnInit {
    affiliates: Affiliate[];
    editState = false;
    affiliateToEdit: Affiliate;

    constructor(
        private affiliateService: AffiliateService,
        private router: Router,
        public afs: AngularFirestore
    ) {}

    ngOnInit(): void {
        /* Get list of affiliates */
        this.affiliateService.get().subscribe(dbAffiliates => {
            this.affiliates = dbAffiliates;
        });
    }

    add() {
        this.router.navigate(['/affiliate-add']);
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
