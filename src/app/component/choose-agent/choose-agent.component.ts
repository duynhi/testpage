import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS } from 'src/app/utils/common-constant';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { GlobalValueService } from 'src/app/service/global-value-service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-choose-agent',
  templateUrl: './choose-agent.component.html',
  styleUrls: ['./choose-agent.component.scss']
})
export class ChooseAgentComponent implements OnInit {
  @ViewChild('myContainer') myContainer: ElementRef;
  myPageUserInfo: any;
  API_URLS = API_URLS;
  listAgent = [];
  loading = false;
  addDiv = false;
  listErrors = [];
  heightBlankDiv = 0;
  masterMyPageUserInfo: any;
  constructor(private baseService: BaseService,
              private router: Router,
              private valueService: GlobalValueService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.masterMyPageUserInfo = JSON.parse(localStorage.getItem('masterMyPageUserInfo'));
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    // if (!this.valueService.userName || !this.valueService.password) {
    //   this.router.navigate(['/login']);
    // }

    this.listAgent = this.masterMyPageUserInfo.tantoClinicInfo;
  }

  onResize(event) {
    if(window.innerHeight > this.myContainer.nativeElement.offsetHeight) {
      this.addDiv = true;
    } else {
      this.addDiv = false;
    }

    // console.log(window.innerHeight + '-' + this.myContainer.nativeElement.offsetHeight + '=' + this.heightBlankDiv);
    // console.log(this.myContainer.nativeElement.offsetHeight);
  }
  ngAfterViewInit() {
    if(window.innerHeight > this.myContainer.nativeElement.offsetHeight) {
      this.addDiv = true;
    } else {
      this.addDiv = false;
    }
   
  }

  getListAgent() {
    const value = {
        token: localStorage.getItem('jwtToken'),
        myPageNo: this.masterMyPageUserInfo.myPageNo

    };
    this.baseService.post(this.API_URLS.getListAgent, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.listAgent = res.agentList;
      } else if ((res.errorList && res.errorList.length > 0)) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  chooseAgent(agentCd, branchCd) {
    this.loading = true;
    const value = {
      mailAddress: window.atob(localStorage.getItem('u')),
      password: window.atob(localStorage.getItem('p')),
      myPageNo: this.masterMyPageUserInfo.myPageNo,
      branchCd: branchCd
    };
    this.baseService.post(this.API_URLS.authen, value).subscribe(res => {
      this.valueService.setUserName(value.mailAddress);
      this.valueService.setPassword(value.password);
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.loading = false;
        localStorage.setItem('emailUser', res.myPageUserInfo.mailAddress);
        localStorage.setItem('registF', res.myPageUserInfo.registF);
        localStorage.setItem('SelectItemInfo', JSON.stringify(res.SelectItemInfo));
        localStorage.setItem('tantoClinicInfo', JSON.stringify(res.myPageUserInfo.tantoClinicInfo));
        localStorage.setItem('myPageUserInfo', JSON.stringify(res.myPageUserInfo));
        localStorage.setItem('jwtToken', res.token);
        if (res.myPageUserInfo.registF === '1') {
          sessionStorage.setItem('changedPass', 'false');
          this.router.navigate(['/setting-pass']);
        } else if (res.myPageUserInfo.tantoClinicInfo.length === 1 &&
          (res.myPageUserInfo.registF === '2' || res.myPageUserInfo.registF === '3' || res.myPageUserInfo.registF === '4')) {
          localStorage.setItem('agentCd', res.myPageUserInfo.tantoClinicInfo[0].agentCd);
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

  showError(message) {
    this.messageService.add({severity: 'error', detail: message});
  }

}
