import { Component, OnInit } from '@angular/core';
import { API_URLS } from 'src/app/utils/common-constant';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/common.service';

@Component({
  selector: 'app-add-agent-success',
  templateUrl: './add-agent-success.component.html',
  styleUrls: ['./add-agent-success.component.scss']
})
export class AddAgentSuccessComponent implements OnInit {
  API_URLS = API_URLS;
  textShow = '';
  splitToken = [];
  constructor(private router: Router,
              private baseService: BaseService) { }

  ngOnInit() {
    const link = window.location.href;
    const splitLink = link.split('?');
    if(splitLink[1]) {
      this.splitToken = splitLink[1].split('=');
      this.changeToken(this.splitToken[1]);
    } else {
      this.router.navigate(['/top-menu']);
    }
  }

  changeToken(newToken) {
    const value = {
      addMypageAgentToken: this.splitToken[1],
    };
    this.baseService.post(this.API_URLS.authenAddAgent, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.textShow = '店舗が追加されました。';
      }
      if (res.errorList && res.errorList.length > 0) {
        this.textShow = '店舗追加が失敗しました。';
      }
    });
  }

  goToLogin() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
