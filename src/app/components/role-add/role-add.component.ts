import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { Affiliate } from '../../models/affiliate';
import { RoleService } from '../../services/role.service';
import { AffiliateService } from '../../services/affiliate.service';

@Component({
    selector: 'app-role-add',
    templateUrl: './role-add.component.html',
    styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent implements OnInit {

    role: Role = { firstName: "" };
    affiliates: Affiliate[];

    constructor(
        private roleService: RoleService,
        private affiliateService: AffiliateService,
        private router: Router
    ) {}

    ngOnInit(): void {
        
        /* Check if user is signed in, otherwise redirect to home */
        this.auth.getUserData().subscribe(user => {
            if(user === null) {
                this.router.navigate(['/home']);
            } else {
                this.user = user[0];
            }
        })

        this.affiliateService.get().subscribe(affiliate => {
            console.log(affiliate);
            this.affiliates = affiliate;
        });
    }

    cancel() {
        this.router.navigate(['/control']);
    }

    add(form) {
        if(this.role.roleName != '') {
            this.roleService.add(this.role);
            this.router.navigate(['/control']);
        }
    }

}
