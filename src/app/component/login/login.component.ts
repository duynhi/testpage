import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';
import { Helper } from 'src/app/utils/common-function';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS, MESSAGE } from 'src/app/utils/common-constant';
import { MessageService } from 'primeng/components/common/messageservice';
import { GlobalValueService } from 'src/app/service/global-value-service';
// GlobalValueService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  MESSAGE = MESSAGE;
  value: Date;
  API_URLS = API_URLS;
  faAngleRight = faAngleRight;
  helper = Helper;
  checked = true;
  clickedLogin = false;
  showError = false;
  errorService = false;
  remember = false;
  listErrors = [];
  loginGroup: FormGroup;
  loading = false;
  listAgentCD = [];
  listAgentCDAfterFilter = [];
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private cookieService: CookieService,
              public baseService: BaseService,
              private messageService: MessageService,
              private valueService: GlobalValueService) {}

  ngOnInit() {
    this.initForm();
    this.onChanges();
    // this.checkToken();
  }

  // checkToken() {
  //   if (localStorage.getItem('jwtToken')) {
  //     this.router.navigate(['top-menu']);
  //   }
  // }

  initForm() {
    this.loginGroup = this.formBuilder.group({
      mailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    if (localStorage.getItem('remember') === 'true' && localStorage.getItem('u') && localStorage.getItem('p')) {
      this.remember = true;
      this.loginGroup.controls.mailAddress.setValue(window.atob(localStorage.getItem('u')));
      this.loginGroup.controls.password.setValue(window.atob(localStorage.getItem('p')));
    } else {
      this.loginGroup.controls.mailAddress.setValue('');
      this.loginGroup.controls.password.setValue('');
      this.remember = false;
    }
  }

  saveCookie() {
    this.cookieService.put('email', this.loginGroup.controls.mailAddress.value);
    this.cookieService.put('password', this.loginGroup.controls.password.value);
    this.cookieService.put('remember',  this.remember.toString());
  }

  goToPrivacy() {
    window.open('https://www.hoken-clinic.com/privacy/', '_blank');
  }

  onChanges(): void {
    this.loginGroup.valueChanges.subscribe(val => {
    });
  }

  typeEvent(event) {
    this.clickedLogin = false;
  }

  login() {
    this.loading = true;
    // this.saveCookie();
    this.clickedLogin = true;
    this.loginGroup.controls.mailAddress.markAsTouched();
    this.loginGroup.controls.password.markAsTouched();
    if (!this.loginGroup.invalid) {
      const value = {
        mailAddress: this.loginGroup.controls.mailAddress.value,
        password: this.loginGroup.controls.password.value,
      };
      this.baseService.post(this.API_URLS.authen, value).subscribe(res => {
        this.valueService.setUserName(value.mailAddress);
        this.valueService.setPassword(value.password);
        localStorage.setItem('remember', this.remember.toString());
        localStorage.setItem('u', window.btoa(value.mailAddress));
        localStorage.setItem('p', window.btoa(value.password));
        if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
          this.loading = false;
          // res.myPageUserInfo.registF = '2';
          localStorage.setItem('emailUser', res.myPageUserInfo.mailAddress);
          localStorage.setItem('registF', res.myPageUserInfo.registF);
          localStorage.setItem('SelectItemInfo', JSON.stringify(res.SelectItemInfo));
          localStorage.setItem('masterTantoClinicInfo', JSON.stringify(res.myPageUserInfo.tantoClinicInfo));
          localStorage.setItem('masterMyPageUserInfo', JSON.stringify(res.myPageUserInfo));
          res.myPageUserInfo.familyList.forEach(family => {
            this.listAgentCD.push(family.agentCd);
          });
          this.listAgentCDAfterFilter = Array.from(new Set(res.myPageUserInfo.familyList.map(x => x.agentCd)));
          localStorage.setItem('jwtToken', res.token);
          if (res.myPageUserInfo.registF === '1') {
            localStorage.setItem('tantoClinicInfo', JSON.stringify(res.myPageUserInfo.tantoClinicInfo));
            localStorage.setItem('myPageUserInfo', JSON.stringify(res.myPageUserInfo));
            sessionStorage.setItem('changedPass', 'false');
            this.router.navigate(['/setting-pass']);
          } else if (res.myPageUserInfo.tantoClinicInfo.length === 1 &&
            (res.myPageUserInfo.registF === '2' || res.myPageUserInfo.registF === '3' || res.myPageUserInfo.registF === '4')) {
            localStorage.setItem('agentCd', res.myPageUserInfo.tantoClinicInfo[0].agentCd);
            localStorage.setItem('tantoClinicInfo', JSON.stringify(res.myPageUserInfo.tantoClinicInfo));
            localStorage.setItem('myPageUserInfo', JSON.stringify(res.myPageUserInfo));
            this.router.navigate(['/top-menu']);
          } else if (res.myPageUserInfo.tantoClinicInfo.length > 1 &&
            (res.myPageUserInfo.registF === '2' || res.myPageUserInfo.registF === '3' || res.myPageUserInfo.registF === '4')) {
            this.router.navigate(['/choose-agent']);
          } else if (res.myPageUserInfo.registF === '0') {
            this.messageService.add({severity: 'error', detail: '認証に失敗しました。'});
          }
        }
        if (res.errorList !== null || (res.errorList && res.errorList.length >= 0)) {
          this.loading = false;
          this.listErrors = res.errorList;
        }
      });
    }
  }

  get f() { return this.loginGroup.controls; }


  forgotPass() {
    this.router.navigate(['/forgot-pass']);
  }

}
