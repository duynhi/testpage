import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS } from 'src/app/utils/common-constant';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-schedule-menu',
  templateUrl: './schedule-menu.component.html',
  styleUrls: ['./schedule-menu.component.scss']
})
export class ScheduleMenuComponent implements OnInit {
  myPageUserInfo: any;
  name: string;
  API_URLS = API_URLS;
  tantoClinicInfo: any;
  loading = false;
  faAngleRight = faAngleRight;
  constructor(private baseService: BaseService,
              private messageService: MessageService, ) { }

  ngOnInit() {
    this.tantoClinicInfo = JSON.parse(localStorage.getItem('tantoClinicInfo'));
    // custom phone
    if(this.tantoClinicInfo[0].phone){
      let phone = this.tantoClinicInfo[0].phone.toString();
      let phones = [];
      phones = phone.split('-');
      let newPhone = "";
      for (let i = 0; i < phones.length; i++) {
        newPhone += phones[i].trim();
      }
      this.tantoClinicInfo[0].phone = newPhone;
    }else{
      this.tantoClinicInfo[0].phone = ''
    }
    // end custom phone
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    if (this.tantoClinicInfo) {
      if (this.tantoClinicInfo[0].shopName
        && this.tantoClinicInfo[0].shopName !== '') {
        this.name = this.tantoClinicInfo[0].shopName;
      } else {
        this.name = this.tantoClinicInfo[0].branchCd;
      }
    }
  }

  goToPageHoken() {
    this.loading = true;
    const value = {
      token: localStorage.getItem('jwtToken'),
      myPageNo: this.myPageUserInfo.myPageNo,
      usingF: '13'
    };
    this.baseService.post(this.API_URLS.RegistUsingHistory, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.loading = false;
        window.open('https://www.hoken-clinic.com/list/');
      } else if ((res.errorList && res.errorList.length > 0)) {
        this.loading = false;
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }
  showError(message) {
    this.messageService.add({ severity: 'error', detail: message });
  }
}
