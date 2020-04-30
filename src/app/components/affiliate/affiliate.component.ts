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

    constructor(
        private auth: AuthService,
        private affiliateService: AffiliateService,
        private router: Router
    ) {}

    ngOnInit(): void {
        
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserState()
        .subscribe(user => {
            if(user === null) {
                this.router.navigate(['/home']);
            }
            this.user = user;
        })

        /* Get list of affiliates */
        this.affiliateService.get().subscribe(affiliate => {
            this.affiliates = affiliate;
        });
    }

    add() {
        this.router.navigate(['/affiliate-add']);
    }

}
