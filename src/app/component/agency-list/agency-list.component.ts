import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS } from 'src/app/utils/common-constant';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss'],
  providers: [ConfirmationService]
})
export class AgencyListComponent implements OnInit {
  API_URLS = API_URLS;
  myPageUserInfo: any;
  listContract = [];
  listTantoClinicInfo = [];
  tantoClinicInfo: any;
  agentCd = '';
  showTantoF = false;
  showAgencyList = true;

  constructor(private router: Router,
              private baseService: BaseService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    this.listTantoClinicInfo = JSON.parse(localStorage.getItem('tantoClinicInfo'));
    this.agentCd = localStorage.getItem('agentCd');
    this.listTantoClinicInfo.forEach((tanto) => {
      if (this.agentCd === tanto.agentCd) {
        this.tantoClinicInfo = tanto;
      }
    });
    this.getListAgent();
  }

  showTantoClinic(flag) {
    if (flag === 'show') {
      this.showTantoF = true;
      this.showAgencyList = false;
    }
    if (flag === 'hide') {
      this.showTantoF = false;
      this.showAgencyList = true;
    }
  }

  getListAgent() {
    const value = {
        token: localStorage.getItem('jwtToken'),
        myPageNo: this.myPageUserInfo.myPageNo
    };
    this.baseService.post(this.API_URLS.getListAgent, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.listContract = res.agentList;
      } else if ((res.errorList && res.errorList.length > 0)) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  showError(message) {
    this.messageService.add({severity: 'error', detail: message});
  }

  goDetailContract(agentNo) {
    this.router.navigate(['/agency-input/' + agentNo]);
  }

  deleteContract(i) {
    this.confirmationService.confirm({
      message: '代理店を削除します。よろしいでしょうか？',
      accept: () => {
        const value = {
          token: localStorage.getItem('jwtToken'),
          agentInfo : {
            agentNo: i,
            myPageNo: this.myPageUserInfo.myPageNo
          }
        };
        this.baseService.post(this.API_URLS.deleteAgent, value).subscribe(res => {
          if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
            this.listContract = res.agentList;
          } else if ((res.errorList && res.errorList.length > 0)) {
            res.errorList.forEach(error => {
              this.showError(error.errMessage);
            });
          }
        });
      }
    });
  }

}
