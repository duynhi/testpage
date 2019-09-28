import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Helper } from 'src/app/utils/common-function';
import { AuthService } from 'src/app/service/auth.service';
import { MESSAGE, API_URLS } from 'src/app/utils/common-constant';
import { passEqualEmailValidator } from 'src/app/utils/validator';
import { BaseService } from 'src/app/service/common.service';



@Component({
  selector: 'app-setting-pass',
  templateUrl: './setting-pass.component.html',
  styleUrls: ['./setting-pass.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class SettingPassComponent implements OnInit {
  MESSAGE = MESSAGE;
  API_URLS = API_URLS;
  changePass = false;
  checked = true;
  newPassEqualUser = false;
  emailUser = '';
  loading = false;
  settingPassGroup: FormGroup;
  helper = Helper;
  listErrors = [];
  showMessage = false;
  myPageUserInfo: any;
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private auth: AuthService,
              private baseService: BaseService) { }

  ngOnInit() {
    this.initForm();
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
  }

  changePassword() {
    const value = {
      token: localStorage.getItem('jwtToken'),
      myPagePasswordInfo: {
        myPageNo: this.myPageUserInfo.myPageNo,
        mailAddress: localStorage.getItem('emailUser'),
        oldPassword: this.settingPassGroup.controls.oldPass.value,
        newPassword: this.settingPassGroup.controls.newPass.value,
        mailF: this.checked ? 1 : 0,
      },
    };
    this.loading = true;
    this.baseService.post(this.API_URLS.settingPass, value).subscribe(res => {
      this.loading = false;
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.loading = false;
        this.changePass = true;
      } else if (res.errorList && res.errorList.length > 0) {
        this.loading = false;
        this.listErrors = res.errorList;
      }
    });
  }

  goToLogin() {
    // localStorage.clear();
    this.router.navigate(['/top-menu']);
  }


  comparePass() {
    if (this.settingPassGroup.controls.newPass.value && this.settingPassGroup.controls.newPassConfirm.value) {
      if (this.settingPassGroup.controls.newPass.value === this.settingPassGroup.controls.newPassConfirm.value) {
        this.showMessage = false;
      } else {
        this.showMessage = true;
      }
    }
  }

  initForm() {
    this.settingPassGroup = this.formBuilder.group({
      oldPass: ['', [Validators.required]],
      newPass: ['', [Validators.required, passEqualEmailValidator, Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$')]],
      newPassConfirm: ['', [Validators.required]],
    });
  }

}
