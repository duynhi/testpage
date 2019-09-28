import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS } from 'src/app/utils/common-constant';

@Component({
  selector: 'app-change-token-mail',
  templateUrl: './change-token-mail.component.html',
  styleUrls: ['./change-token-mail.component.scss']
})
export class ChangeTokenMailComponent implements OnInit {
  API_URLS = API_URLS;
  constructor(private router: Router,
              private baseService: BaseService) { }

  ngOnInit() {
    // const link = window.location.href;
    // const splitLink = link.split('?');
    // const splitToken = splitLink[1].split('=');

  }

  callAPI() {
    const link = window.location.href;
    const splitLink = link.split('?');
    const splitToken = splitLink[1].split('=');
    if (splitToken[0] === 'addMypageAgentToken') {
      const value = {
        addMypageAgentToken: splitToken[1],
      };
      this.baseService.post(this.API_URLS.authenAddAgent, value).subscribe(res => {
        if (res.errorList === null || res.errorList.length === 0) {
          this.router.navigate(['/add-agent-success']);
        } else {
          console.log('error');
        }
      });
    } else {
      const value = {
        changeMailToken: splitToken[1],
      };
      this.baseService.post(this.API_URLS.authenChangeMail, value).subscribe(res => {
        if (res.errorList === null || res.errorList.length === 0) {
          // this.router.navigate(['/customer-mail-confirm-success']);
        } else {
          console.log('error');
        }
      });
    }
  }

}
