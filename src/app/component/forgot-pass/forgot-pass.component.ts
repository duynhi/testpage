import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Helper } from 'src/app/utils/common-function';
import { AuthService } from 'src/app/service/auth.service';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS, MESSAGE } from 'src/app/utils/common-constant';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {
  MESSAGE = MESSAGE;
  pickPass = false;
  // loading = false;
  helper = Helper;
  API_URLS = API_URLS;
  faAngleRight = faAngleRight;
  loading = false;
  registF = 1;
  forgotPassGroup: FormGroup;
  listErrors = [];
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              public baseService: BaseService,
              private messageService: MessageService, ) {}

  ngOnInit() {
    this.initForm();
  }

  sendPass() {
    this.loading = true;
    if (this.forgotPassGroup.valid) {
      const value = {
        mailAddress: this.forgotPassGroup.controls.emailForgot.value,
        // token: localStorage.getItem('jwtToken')
      };
      this.baseService.post(this.API_URLS.resetPass, value).subscribe(res => {
        if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
          this.loading = false;
          this.pickPass = true;
        } else if (res.errorList && res.errorList.length > 0) {
          this.listErrors = res.error.errorList;
        }
      });
    }

  }

  goToLogin() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  get f() { return this.forgotPassGroup.controls; }

  initForm() {
    this.forgotPassGroup = this.formBuilder.group({
      emailForgot: ['', [Validators.required, Validators.email]],
    });
  }

}
