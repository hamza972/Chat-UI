import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    closeResult: string;
    authError: any;

    constructor(
        private auth: AuthService,
        private afAuth: AngularFireAuth,
        private modalService: NgbModal,
    ) { }

    ngOnInit() {
        this.auth.eventAuthError$.subscribe( data => {
            this.authError = data;
        });
    }

    login(frm) {
        this.auth.login(frm.value.email, frm.value.password);
    }

  resetPassword(emailAddress) {
    this.afAuth.auth.sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      alert('Password reset sent.')
    }).catch( (error) => {
      // An error happened.
      alert(error.message);
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
