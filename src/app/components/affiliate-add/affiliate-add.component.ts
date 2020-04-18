import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/Affiliate';

@Component({
    selector: 'app-affiliate-add',
    templateUrl: './affiliate-add.component.html',
    styleUrls: ['./affiliate-add.component.scss']
})
export class AffiliateAddComponent implements OnInit {

    affiliate: Affiliate = {
        countryName: ""
    };

    constructor(
        private affiliateService: AffiliateService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    cancel() {
        this.router.navigate(['/control']);
    }

    add(form) {
        if(this.affiliate.countryName != '') {
            this.affiliateService.add(this.affiliate);
            this.router.navigate(['/control']);
        }
    }

}
