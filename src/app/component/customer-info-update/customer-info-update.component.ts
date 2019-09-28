import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MESSAGE, API_URLS, CALENDARJP } from 'src/app/utils/common-constant';
import { SelectItem } from 'primeng/components/common/selectitem';
import { BaseService } from 'src/app/service/common.service';
import { MessageService } from 'primeng/components/common/messageservice';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-info-update',
  templateUrl: './customer-info-update.component.html',
  styleUrls: ['./customer-info-update.component.scss']
})
export class CustomerInfoUpdateComponent implements OnInit, AfterContentInit {
  myPageUserInfo: any;
  selectItemInfo: any;
  dataMain: any;
  infoMainGroup: any;
  MESSAGE = MESSAGE;
  checked = false;
  defaultDate: any;
  listFamily = [];
  cities: SelectItem[] = [{value: '', label: ''}];
  API_URLS = API_URLS;
  maxDate = new Date();
  CALENDARJP = CALENDARJP;
  years: SelectItem[] = [{label: '', value: null}];
  months: SelectItem[] = [{label: '', value: null}];
  days: SelectItem[] = [{label: '', value: null}];
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private baseService: BaseService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    this.listFamily = this.myPageUserInfo.familyList;
    this.selectItemInfo = JSON.parse(localStorage.getItem('SelectItemInfo'));
    this.listFamily.forEach(person => {
      if (person.relation === '0' || person.relation === '本人') {
        this.dataMain = person;
      }
    });
    this.initForm();
    this.getDataDisplay();
    this.maxDate = new Date();
    this.initTimeDropdown();
  }

  initTimeDropdown() {
    const dateNow = new Date();
    for ( let i = dateNow.getFullYear(); i >= 1800; i--) {
      this.years.push({label: i.toString(), value: i});
    }
    this.f.month.disable();
    this.f.day.disable();
  }

  getDays(month, year) {
    this.f.day.enable();
    const numberDate = new Date(year, month, 0).getDate();
    if ((this.maxDate.getMonth() + 1) === month && this.maxDate.getFullYear() === year) {
      this.days = [{label: '', value: null}];
      for (let i = 1; i <= numberDate; i++) {
        if (i <= this.maxDate.getDate()) {
          if (i.toString().length === 1) {
            this.days.push({label: '0' + i.toString(), value: '0' + i.toString()});
          } else {
            this.days.push({label: i.toString(), value: i.toString()});
          }
        }
      }
    } else {
      this.days = [{label: '', value: null}];
      for (let i = 1; i <= numberDate; i++) {
        if (i.toString().length === 1) {
          this.days.push({label: '0' + i.toString(), value: '0' + i.toString()});
        } else {
          this.days.push({label: i.toString(), value: i.toString()});
        }
      }
    }
  }

  changeYear() {
    this.f.month.enable();
    if (this.f.year.value === this.maxDate.getFullYear()) {
      this.months = [{label: '', value: null}];
      for (let i = 1; i <= this.maxDate.getMonth() + 1; i++) {
        if (i.toString().length === 1) {
          this.months.push({label: '0' + i.toString(), value: '0' + i.toString()});
        } else {
          this.months.push({label: i.toString(), value: i.toString()});
        }
      }
    } else {
      this.months = [{label: '', value: null}];
      for (let i = 1; i <= 12; i++) {
        if (i.toString().length === 1) {
          this.months.push({label: '0' + i.toString(), value: '0' + i.toString()});
        } else {
          this.months.push({label: i.toString(), value: i.toString()});
        }
      }
    }
    if (this.f.month.value) {
      this.getDays(this.f.month.value, this.f.year.value);
    }
  }

  changeMonth() {
    if (this.f.year.value) {
      this.getDays(this.f.month.value, this.f.year.value);
    }
  }

  ngAfterContentInit() {
    if (this.myPageUserInfo.mailF === '1') {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

  mapDataInit() {
    this.f.city.setValue(this.myPageUserInfo.addressPref.toString());
    this.f.street.setValue(this.myPageUserInfo.addressTown);
    this.f.apartment.setValue(this.myPageUserInfo.addressBldg);
    this.f.phone.setValue(this.myPageUserInfo.phone);
    this.f.zipcode1.setValue(this.myPageUserInfo.zip1);
    this.f.zipcode2.setValue(this.myPageUserInfo.zip2);
    this.f.nameFirst.setValue(this.dataMain.firstName);
    this.f.nameLast.setValue(this.dataMain.lastName);
    this.f.nameKanaFirst.setValue(this.dataMain.firstNameKana);
    this.f.nameKanaLast.setValue(this.dataMain.lastNameKana);
    this.f.year.setValue(parseInt(this.dataMain.birthday.slice(0, 4), 10));
    this.changeYear();
    this.f.month.setValue(this.dataMain.birthday.slice(4, 6));
    this.changeMonth();
    this.f.day.setValue(this.dataMain.birthday.slice(6, 8));
  }

  initForm() {
    this.infoMainGroup = this.formBuilder.group({
      year: ['', [Validators.required]],
      month: ['', [Validators.required]],
      day: ['', [Validators.required]],
      nameFirst: ['', [Validators.required, Validators.maxLength(50)]],
      nameLast: ['', [Validators.required, Validators.maxLength(50)]],
      nameKanaFirst: ['', [Validators.maxLength(50), Validators.pattern('^[ぁ-んー 　]*$')]],
      nameKanaLast: ['', [Validators.maxLength(50), Validators.pattern('^[ぁ-んー 　]*$')]],
      phone: ['', [Validators.maxLength(50), Validators.pattern('^[0-9-]+$')]],
      zipcode1: ['', [Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
      zipcode2: ['', [Validators.maxLength(4), Validators.pattern('^[0-9]+$')]],
      city: [''],
      street: ['', [ Validators.maxLength(400)]],
      apartment: ['', Validators.maxLength(200)]
    });
  }

  get f() { return this.infoMainGroup.controls; }

  getDataDisplay() {
    const value = {};
    this.baseService.post(this.API_URLS.display, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        res.selectItemInfo.prefSelectList.forEach(city => {
          this.cities.push({label: city.name, value: city.name});
        });
        this.mapDataInit();
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

  chooseGender(sex) {
    this.dataMain.sex = sex;
  }

  saveMain() {
    this.listFamily.forEach(person => {
      if (person.relation === '0') {
      person.birthday =  this.infoMainGroup.controls.year.value +
      this.infoMainGroup.controls.month.value + this.infoMainGroup.controls.day.value;
      person.firstName = this.f.nameFirst.value;
      person.lastName = this.f.nameLast.value;
      person.firstNameKana = this.f.nameKanaFirst.value;
      person.lastNameKana = this.f.nameKanaLast.value;
      person.sex = this.dataMain.sex;
      }
    });
    const value = {
      token: localStorage.getItem('jwtToken'),
      myPageUserInfo: {
        myPageNo: this.myPageUserInfo.myPageNo,
        phone: this.f.phone.value,
        zip1: this.f.zipcode1.value,
        zip2: this.f.zipcode2.value,
        addressPref: this.f.city.value,
        addressTown: this.f.street.value,
        addressBldg: this.f.apartment.value,
        mailF: this.checked ? 1 : 0,
        familyList: this.listFamily
      },
    };
    this.baseService.post(this.API_URLS.saveFamily, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        localStorage.setItem('myPageUserInfo', JSON.stringify(res.myPageUserInfo));
        this.router.navigate(['/customer-list']);
      } else if (res.errorList && res.errorList.length > 0) {
        res.errorList.forEach((error) => {
          this.showError(error.errMessage);
        });
      }
    });
  }


  back() {
    this.router.navigate(['/customer-list']);
  }

  yuubinbango(){
    let z1 = this.infoMainGroup.controls.zipcode1.value;
    let z2 = this.infoMainGroup.controls.zipcode2.value;
    const value = {
        zip1: z1,
        zip2: z2
    }
      // this.loading = true;
      this.baseService.post(this.API_URLS.address, value).subscribe(res => {
        this.loading = false;
        if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
          this.infoMainGroup.controls.city.setValue(res.addressInfo.addressPref);
          this.infoMainGroup.controls.street.setValue(res.addressInfo.addressTown);
          // this.createMyPageGroup.controls.apartment.setValue(res.addressInfo.addressBldg);
        }else{}
      }); 
  }

}
