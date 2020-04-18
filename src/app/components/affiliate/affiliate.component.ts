import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AffiliateService } from '../../services/affiliate.service';
import { Affiliate } from '../../models/Affiliate';

@Component({
    selector: 'app-affiliate',
    templateUrl: './affiliate.component.html',
    styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent implements OnInit {
    affiliates: Affiliate[];

    constructor(
        private affiliateService: AffiliateService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.affiliateService.get().subscribe(affiliate => {
            this.affiliates = affiliate;
        });
    }

    add() {
        this.router.navigate(['/affiliate-add']);
    }

}
