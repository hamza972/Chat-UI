import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/affiliate';

@Component({
    selector: 'app-affiliate-add',
    templateUrl: './affiliate-add.component.html',
    styleUrls: ['./affiliate-add.component.scss']
})
export class AffiliateAddComponent implements OnInit {

    user: firebase.User;

    affiliate: Affiliate = {
        name: ''
    };
    authError: any;

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
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    add() {
        if (this.affiliate.name !== '') {
            this.affiliateService.add(this.affiliate);
            this.router.navigate(['/control']);
        }
    }

}
