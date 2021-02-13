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
        let affiliateName: string;
        this.affiliateService.getAffiliate(affiliateId).subscribe(dbAffiliate => {
            const affiliate: Affiliate = dbAffiliate;
            affiliateName = affiliate.name;
            this.afs.collection('Roles').ref
            .where('affiliation', '==', affiliateName).get().then(dbAffiliatedRoles => {
                const affiliatedRoles: Affiliate[] = dbAffiliatedRoles.docs;
                if (affiliatedRoles.length === 0) {
                    this.afs.collection('Affiliates').doc(affiliateId).delete();
                } else {
                    alert ('Affiliate "' + affiliateName + '" still has ' + affiliatedRoles.length
                    + ' role(s) affiliated, cannot delete.');
                }
            });
        });
    }

}

