import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS } from 'src/app/utils/common-constant';

@Component({
  selector: 'app-customer-mail-confirm-success',
  templateUrl: './customer-mail-confirm-success.component.html',
  styleUrls: ['./customer-mail-confirm-success.component.scss']
})
export class CustomerMailConfirmSuccessComponent implements OnInit {
  API_URLS = API_URLS;
  textShow = 'Changing...';
  splitToken = [];
  constructor(private router: Router,
              private baseService: BaseService) { }

  ngOnInit() {
    const link = window.location.href;
    const splitLink = link.split('?');
    this.splitToken = splitLink[1].split('=');
    this.changeToken(this.splitToken[1]);
  }

  changeToken(newToken) {
    const value = {
      changeMailToken: this.splitToken[1],
    };
    this.baseService.post(this.API_URLS.authenChangeMail, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.textShow = 'メールアドレスの変更が完了しました。';
      }
      if (res.errorList && res.errorList.length > 0) {
        this.textShow = 'メールアドレスの変更が失敗しました。';
      }
    });
  }

  goToLogin() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
