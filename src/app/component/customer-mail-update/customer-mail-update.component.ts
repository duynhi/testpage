import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/service/common.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MESSAGE, API_URLS } from 'src/app/utils/common-constant';

@Component({
  selector: 'app-customer-mail-update',
  templateUrl: './customer-mail-update.component.html',
  styleUrls: ['./customer-mail-update.component.scss']
})
export class CustomerMailUpdateComponent implements OnInit {
  myPageUserInfo: any;
  mailGroup: any;
  API_URLS = API_URLS;
  loading = false;
  MESSAGE = MESSAGE;
  constructor(private baseService: BaseService,
              private formBuilder: FormBuilder,
              public messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    this.initForm();
  }

  initForm() {
    this.mailGroup = this.formBuilder.group({
      // tslint:disable-next-line: max-line-length
      newMail: ['', [Validators.required,
                     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
                     Validators.maxLength(255),
                    ]],

    });
  }

  updateMail() {
    this.loading = true;
    const value = {
      token: localStorage.getItem('jwtToken'),
      myPageNo: this.myPageUserInfo.myPageNo,
      newMailAddress: this.mailGroup.controls.newMail.value
    };
    this.baseService.post(this.API_URLS.updateMail, value).subscribe(res => {
      this.loading = false;
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.router.navigate(['/customer-mail-update-success']);
      }
      if (res.errorList !== null || (res.errorList && res.errorList.length >= 0)) {
        res.errorList.forEach((error) => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  get f() { return this.mailGroup.controls; }


  showError(message) {
    this.messageService.add({ severity: 'error', detail: message });
  }

  back() {
    this.router.navigate(['/customer-setting']);
  }

}
