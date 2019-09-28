import { Component, OnInit } from '@angular/core';
import { API_URLS } from 'src/app/utils/common-constant';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/common.service';
import { MessageService } from 'primeng/components/common/messageservice';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-notification-list',
  templateUrl: './customer-notification-list.component.html',
  styleUrls: ['./customer-notification-list.component.scss']
})
export class CustomerNotificationListComponent implements OnInit {
  myPageUserInfo: any;
  tantoClinicInfo: any;
  API_URLS = API_URLS;
  listMessage = [];
  messageShow: any;
  phoneNumber = 12123123123;
  name = '';
  showLoading = false;
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
  constructor(
              private router: Router,
              private baseService: BaseService,
              private messageService: MessageService
  ) { }

  ngOnInit() {
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    this.getListMessage();
    this.myPageUserInfo.familyList.forEach((person) => {
      if (person.relation === '0') {
        this.name = person.lastName + person.firstName;
      }
    });
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

  getListMessage() {
    if (!this.showLoading && this.listMessage.length % 10 === 0) {
      const value = {
        token: localStorage.getItem('jwtToken'),
        messageInfo: {
          myPageNo: this.myPageUserInfo.myPageNo,
          agentCd: localStorage.getItem('agentCd'),
          kikanType: '2',
          offset: this.listMessage.length + 1,
        }
      };
      this.showLoading = true;
      this.baseService.post(this.API_URLS.messageTop, value).subscribe(res => {
        if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
         this.onSuccess(res);
        } else if (res.errorList && res.errorList.length > 0) {
          this.showLoading = false;
          res.errorList.forEach(error => {
            this.showError(error.errMessage);
          });
        }
      });
    }
  }

  onSuccess(res) {
    res.messageList.forEach((message) => {
      this.listMessage.push(message);
    });
    this.listMessage.forEach((message) => {
      message.sendDate = moment(message.sendDate, 'YYYYMMDD').format('YYYY年MM月DD日');
    });
    this.showLoading = false;
  }

  changeDataAfterAdd(event) {
    this.display.status = false;
  }

}
