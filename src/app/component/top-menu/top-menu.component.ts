import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS } from 'src/app/utils/common-constant';
import * as moment from 'moment';
import { MessageService } from 'primeng/components/common/messageservice';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  myPageUserInfo: any;
  faAngleRight = faAngleRight;
  tantoClinicInfo = [];
  tantoChoose: any;
  API_URLS = API_URLS;
  listMessage = [];
  messageShow: any;
  masterTantoClinicInfo = [];
  phoneNumber = 12123123123;
  selectItemInfo: any;
  name = '';
  display = {
    status: false
  };
  data = {
    from: 'topMenu',
    messageTitle: '',
    nameMain: '',
    value: null
  };
  dataWidth: number;
  constructor(private router: Router,
              private baseService: BaseService,
              private messageService: MessageService ) { }


  ngOnInit() {
    this.tantoClinicInfo = JSON.parse(localStorage.getItem('tantoClinicInfo'));
    // ２回目ログイン後をチェックして、tantoClinicInfo配列は１のみ返却
    this.masterTantoClinicInfo = JSON.parse(localStorage.getItem('masterTantoClinicInfo'));
    if (this.tantoClinicInfo.length === 1) {
      localStorage.setItem('agentCd', this.tantoClinicInfo[0].agentCd);
    }
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    const agentCd = localStorage.getItem('agentCd');
    if (agentCd) {
        this.tantoClinicInfo.forEach((tanto) => {
          if (tanto.agentCd === agentCd) {
              this.tantoChoose = tanto;
          }
        });
        this.myPageUserInfo.familyList.forEach((person) => {
          if (person.relation === '0'　||　person.relation === '本人') {
            this.name = person.lastName + ' ' + person.firstName;
          }
        });
      }
    this.getListMessage();
  }

  goToChooseAgent() {
    this.router.navigate(['/choose-agent']);
  }

  redirect(page: string) {
    this.router.navigate(['/' + page]);
  }

  showDialog(index) {
    this.dataWidth = window.innerWidth;
    this.display = {
      status: true
    };

    this.messageShow = this.listMessage[index];
    this.data.messageTitle = 'お知らせ';
    this.messageShow.message = this.messageShow.message.replace(/\r?\n|\r/g, ' ').trim().split(' ');
    this.data.value = this.messageShow;
    this.data.nameMain = this.name + '様';
  }

  showError(message) {
    this.messageService.add({severity: 'error', detail: message});
  }

  goToNotiList() {
    this.router.navigate(['/notifi-list']);
  }

  getListMessage() {
    const value = {
      token: localStorage.getItem('jwtToken'),
      messageInfo: {
        myPageNo: this.myPageUserInfo.myPageNo,
        agentCd: localStorage.getItem('agentCd'),
        kikanType: '2',
        offset: 0
      }
    };
    this.baseService.post(this.API_URLS.messageTop, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.listMessage = res.messageList;
        this.listMessage.forEach((message) => {
          message.sendDate = moment(message.sendDate, 'YYYYMMDD').format('YYYY年MM月DD日');
        });
      } else if ((res.errorList && res.errorList.length > 0)) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  goToScheduleMenu() {
    this.router.navigate(['schedule-menu']);
  }

  changeDataAfterAdd(event) {
    this.display.status = false;
  }

}
