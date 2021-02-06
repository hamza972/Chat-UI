import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/affiliate';

@Component({
    selector: 'app-affiliate',
    templateUrl: './affiliate.component.html',
    styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent implements OnInit {
    affiliates: Affiliate[];
    user: firebase.User;
    editState = false;
    itemToEdit: Affiliate;

    constructor(
        private auth: AuthService,
        private affiliateService: AffiliateService,
        private router: Router
    ) {}

    ngOnInit(): void {

        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if (user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
            }
        });

        /* Get list of affiliates */
        this.affiliateService.get().subscribe(dbAffiliates => {
            this.affiliates = dbAffiliates;
        });
    }

    add() {
        this.router.navigate(['/affiliate-add']);
    }

    edit($event, affiliate: Affiliate) {
        console.log(123);
        this.editState = true;
        this.itemToEdit = affiliate;
    }

    update(affiliate: Affiliate) {
        this.affiliateService.update(affiliate);
        this.clearState();
    }

    clearState() {
        this.editState = false;
        this.itemToEdit = null;
    }

}
