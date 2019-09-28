import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS } from 'src/app/utils/common-constant';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agency-input',
  templateUrl: './agency-input.component.html',
  styleUrls: ['./agency-input.component.scss']
})
export class AgencyInputComponent implements OnInit {
  API_URLS = API_URLS;
  listContract = [];
  myPageUserInfo: any;
  infoContractGroup: any;
  sub: any;
  id: number;
  constructor(private baseService: BaseService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
      // this.listContract = [
      //   {
      //     agentNo: 1,
      //     agentName: 'vnext',
      //     tantoName: 'duy',
      //     phone: '123123123',
      //     url: 'https://aws.amazon.com/vi/ebs/'
      //   }
      // ];
      this.getListAgent();
      this.initForm();
    });
  }

  getListAgent() {
    const value = {
      // listAgentRequest: {
        token: localStorage.getItem('jwtToken'),
        myPageNo: this.myPageUserInfo.myPageNo
      // }

    };
    this.baseService.post(this.API_URLS.getListAgent, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.listContract = res.agentList;
        this.initForm();
      } else if ((res.errorList && res.errorList.length > 0)) {
        this.initForm();
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  showError(message) {
    this.messageService.add({ severity: 'error', detail: message });
  }

  get f() { return this.infoContractGroup.controls; }

  initForm() {
    this.infoContractGroup = this.formBuilder.group({
      agentName: ['', [Validators.maxLength(50)]],
      tantoName: ['', Validators.maxLength(50)],
      phone: ['', [Validators.maxLength(50), Validators.pattern('^[0-9-]+$')]],
      url: ['', Validators.maxLength(200)],
    });
    this.listContract.forEach((contract) => {
      if (contract.agentNo === this.id && this.id !== 0) {
        this.f.agentName.setValue(contract.agentName);
        this.f.tantoName.setValue(contract.tantoName);
        this.f.phone.setValue(contract.phone);
        this.f.url.setValue(contract.url);
      }
    });
  }

  saveContract() {
    const value = {
      token: localStorage.getItem('jwtToken'),
      agentInfo: {
        agentNo: this.id === 0 ? null : this.id,
        myPageNo: this.myPageUserInfo.myPageNo,
        agentName: this.f.agentName.value,
        tantoName: this.f.tantoName.value,
        phone: this.f.phone.value,
        url: this.f.url.value,
      }
    };
    this.baseService.post(this.API_URLS.saveAgent, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.listContract = res.agentList;
        this.router.navigate(['/agency-list']);
      } else if ((res.errorList && res.errorList.length > 0)) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  back() {
    this.router.navigate(['/agency-list']);
  }

}
