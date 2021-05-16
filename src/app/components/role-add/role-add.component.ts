import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { Affiliate } from '../../models/affiliate';
import { RoleService } from '../../services/role.service';
import { AuthService } from '../../services/auth.service';
import { AffiliateService } from '../../services/affiliate.service';
import { AppUser } from 'src/app/models/user';

@Component({
    selector: 'app-role-add',
    templateUrl: './role-add.component.html',
    styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

    role: Role = { };
    affiliates: Affiliate[];
    user: AppUser = {};
    authError: any;
    EmaiList: any;

    constructor(
        private auth: AuthService,
        private roleService: RoleService,
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

        this.affiliateService.get().subscribe(affiliate => {
            this.affiliates = affiliate;
        });
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    add() {
        if (this.role.title !== '') {
            console.log(this.role.affiliateID);
            this.affiliateService.getAffiliate(this.role.affiliateID).subscribe((dbAffiliate) => {
                const affiliate: Affiliate = dbAffiliate;
                this.role.affiliation = affiliate.name;
                console.log(this.role);
                this.roleService.add(this.role);
                this.roleService.AppendEmailList(this.role.email);
            });
            this.router.navigate(['/control']);
        }
    }
}
