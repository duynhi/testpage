import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/components/common/selectitem';
import * as moment from 'moment';
import { MESSAGE, API_URLS, CALENDARJP } from 'src/app/utils/common-constant';
import { BaseService } from 'src/app/service/common.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-create-new-page',
  templateUrl: './create-new-page.component.html',
  styleUrls: ['./create-new-page.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class CreateNewPageComponent implements OnInit {
  API_URLS = API_URLS;
  MESSAGE = MESSAGE;
  loading = false;
  confirm = false;
  success = false;
  checked = true;
  mailF = true;
  listErrors = [];
  // checkedbtn = true;
  createMyPageGroup: FormGroup;
  genders: SelectItem[] = [];
  favorites: SelectItem[] = [];
  cities: SelectItem[] = [];
  date: string;
  selectedGender = 'M';
  listSelect: any;
  registF: string;
  favoriteLabel: string;
  genderLabel: string;
  cityLabel: string;
  maxDate: Date;
  CALENDARJP = CALENDARJP;
  years: SelectItem[] = [{label: '', value: null}];
  months: SelectItem[] = [{label: '', value: null}];
  days: SelectItem[] = [{label: '', value: null}];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public messageService: MessageService,
              public baseService: BaseService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getDataDisplay();
    this.initForm();
    this.maxDate = new Date();
    this.initTimeDropdown();
  }
  initTimeDropdown() {
    const dateNow = new Date();
    for (let i = 1905; i <= 2050; i++) {
      this.years.push({ label: i.toString(), value: i });
    }
    this.f.month.disable();
    this.f.day.disable();
  }

  getDays(month, year) {
    const dateNow = new Date();
    this.f.day.enable();
    const numberDate = new Date(year, month, 0).getDate();
    this.days = [{label: '', value: null}];
    // if (this.f.month.value === '0' + (dateNow.getMonth() + 1)) {
    //   for (let i = dateNow.getDate(); i <= numberDate; i++) {
    //     if (i.toString().length === 1) {
    //       this.days.push({label: '0' + i.toString(), value: '0' + i.toString()});
    //     } else {
    //       this.days.push({label: i.toString(), value: i.toString()});
    //     }
    //   }
    // } else {
    for (let i = 1; i <= numberDate; i++) {
        if (i.toString().length === 1) {
          this.days.push({label: '0' + i.toString(), value: '0' + i.toString()});
        } else {
          this.days.push({label: i.toString(), value: i.toString()});
        }
      }
    // }
  }


  changeYear() {
     const dateNow = new Date();
     this.f.month.enable();
     this.months = [{label: '', value: null}];
    // if(this.f.year.value === dateNow.getFullYear()) {
    //   for (let i = dateNow.getMonth() + 1; i <= 12; i++) {
    //     if (i.toString().length === 1) {
    //       this.months.push({label: '0' + i.toString(), value: '0' + i.toString()});
    //     } else {
    //       this.months.push({label: i.toString(), value: i.toString()});
    //     }
    //   }
    // } else {
     for (let i = 1; i <= 12; i++) {
        if (i.toString().length === 1) {
          this.months.push({label: '0' + i.toString(), value: '0' + i.toString()});
        } else {
          this.months.push({label: i.toString(), value: i.toString()});
        }
      // }
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

  // initTimeDropdown() {
  //   const dateNow = new Date();
  //   for ( let i = dateNow.getFullYear(); i >= 1800; i--) {
  //     this.years.push({label: i.toString(), value: i});
  //   }
  //   this.f.month.disable();
  //   this.f.day.disable();
  // }

  // getDays(month, year) {
  //   this.f.day.enable();
  //   const numberDate = new Date(year, month, 0).getDate();
  //   if ((this.maxDate.getMonth() + 1) === month && this.maxDate.getFullYear() === year) {
  //     this.days = [{label: '', value: null}];
  //     for (let i = 1; i <= numberDate; i++) {
  //       if (i <= this.maxDate.getDate()) {
  //         if (i.toString().length === 1) {
  //           this.days.push({label: '0' + i.toString(), value: '0' + i.toString()});
  //         } else {
  //           this.days.push({label: i.toString(), value: i.toString()});
  //         }
  //       }
  //     }
  //   } else {
  //     this.days = [{label: '', value: null}];
  //     for (let i = 1; i <= numberDate; i++) {
  //       if (i.toString().length === 1) {
  //         this.days.push({label: '0' + i.toString(), value: '0' + i.toString()});
  //       } else {
  //         this.days.push({label: i.toString(), value: i.toString()});
  //       }
  //     }
  //   }
  // }


  // changeYear() {
  //   this.f.month.enable();
  //   if (this.f.year.value === this.maxDate.getFullYear()) {
  //     this.months = [{label: '', value: null}];
  //     for (let i = 1; i <= this.maxDate.getMonth() + 1; i++) {
  //       if (i.toString().length === 1) {
  //         this.months.push({label: '0' + i.toString(), value: '0' + i.toString()});
  //       } else {
  //         this.months.push({label: i.toString(), value: i.toString()});
  //       }
  //     }
  //   } else {
  //     this.months = [{label: '', value: null}];
  //     for (let i = 1; i <= 12; i++) {
  //       if (i.toString().length === 1) {
  //         this.months.push({label: '0' + i.toString(), value: '0' + i.toString()});
  //       } else {
  //         this.months.push({label: i.toString(), value: i.toString()});
  //       }
  //     }
  //   }
  //   if (this.f.month.value) {
  //     this.getDays(this.f.month.value, this.f.year.value);
  //   }
  // }

  // changeMonth() {
  //   if (this.f.year.value) {
  //     this.getDays(this.f.month.value, this.f.year.value);
  //   }
  // }
  chooseGender(value) {
    this.selectedGender = value;
  }
  confirmInfo() {
    this.confirm = true;
    window.scrollTo(0, 0);
    this.listSelect.selectItemInfo.branchSelectList.forEach(branch => {
      if (branch.branchCd ===  this.createMyPageGroup.controls.favorite.value) {
        this.favoriteLabel = branch.shopName;
      }
    });
    // this.listSelect.selectItemInfo.prefSelectList.forEach(city => {
    //   if (city.selNo ===  this.createMyPageGroup.controls.city.value) {
    //     this.cityLabel = city.name;
    //   }
    // });
    this.date = this.f.year.value +  '年' + this.f.month.value +  '月' + this.f.day.value +  '日';
    if (this.selectedGender === 'M') {
      this.genderLabel = '男性';
    } else {
      this.genderLabel = '女性';
    }
  }

  back() {
    this.confirm = false;
    window.scrollTo(0, 0);
  }

  submitForm() {
    if (this.createMyPageGroup.controls.month.value.length === 1) {

    }
    const value = {
      myPageUserInfo: {
        sex: this.selectedGender,
        birthday: this.createMyPageGroup.controls.year.value +
        this.createMyPageGroup.controls.month.value + this.createMyPageGroup.controls.day.value,
        mailAddress: this.createMyPageGroup.controls.email.value,
        lastName: this.createMyPageGroup.controls.nameLast.value,
        firstName: this.createMyPageGroup.controls.nameFirst.value,
        lastNameKana: this.createMyPageGroup.controls.nameKanaLast.value,
        firstNameKana: this.createMyPageGroup.controls.nameKanaFirst.value,
        phone: this.createMyPageGroup.controls.phone.value,
        zip1: this.createMyPageGroup.controls.zipcode1.value,
        zip2: this.createMyPageGroup.controls.zipcode2.value,
        addressPref: this.createMyPageGroup.controls.city.value,
        addressTown: this.createMyPageGroup.controls.street.value,
        addressBldg: this.createMyPageGroup.controls.apartment.value,
        mailF: this.mailF ? 1 : 0,
        tantoClinicInfo: {
          agentCd: '',
          branchCd: this.createMyPageGroup.controls.favorite.value,
        }
      }
    };
    this.loading = true;
    this.baseService.post(this.API_URLS.myPageRegist, value).subscribe(res => {
      this.loading = false;
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.success = true;
        window.scrollTo(0, 0);
        this.confirm = false;
        this.registF = res.myPageUserInfo.registF;
        localStorage.setItem('registF', res.myPageUserInfo.registF);
        localStorage.setItem('emailUser', res.myPageUserInfo.mailAddress);
      }
      if (res.errorList && res.errorList.length > 0) {
        this.listErrors = res.errorList;
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  getDataDisplay() {
    const value = {};
    // set default item favorites dropdown
    this.favorites.push({label: '以下からご選択ください。', value: ''});
    this.baseService.post(this.API_URLS.display, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.listSelect = res;
        localStorage.setItem('listSelect', this.listSelect);
        res.selectItemInfo.branchSelectList.forEach(branch => {
          this.favorites.push({label: branch.shopName, value: branch.branchCd});
        });
        res.selectItemInfo.prefSelectList.forEach(city => {
          this.cities.push({label: city.name, value: city.name});
        });
        res.selectItemInfo.sexfSelectList.forEach(gender => {
          this.genders.push({label: gender.name, value: gender.reserve});
        });
      } else if ((res.errorList && res.errorList.length > 0)) {
        this.listErrors = res.errorList;
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  showError(message) {
    this.messageService.add({severity: 'error', detail: message});
  }

  get f() { return this.createMyPageGroup.controls; }

  initForm() {
    this.createMyPageGroup = this.formBuilder.group({
      favorite: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      year: ['', [Validators.required]],
      month: ['', [Validators.required]],
      day: ['', [Validators.required]],
      nameFirst: ['', [Validators.required, Validators.maxLength(50)]],
      nameLast: ['', [Validators.required, Validators.maxLength(50)]],
      nameKanaFirst: ['', [Validators.maxLength(50), Validators.pattern('^[ぁ-んー 　]*$')]],
      nameKanaLast: ['', [Validators.maxLength(50), Validators.pattern('^[ぁ-んー 　]*$')]],
      phone: ['', [Validators.maxLength(50), Validators.pattern('^[0-9-]+$')]],
      zipcode1: ['', [Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
      zipcode2: ['', [Validators.maxLength(4), , Validators.pattern('^[0-9]+$')]],
      city: [''],
      accept: [''],
      street: ['', Validators.maxLength(400)],
      apartment: ['', Validators.maxLength(200)]
    });

    this.createMyPageGroup.controls.accept.setValue('0');
  }

  convertTime() {
    this.date = moment(this.createMyPageGroup.controls.dob.value).format('YYYY-MM-DD');
  }

  goToLogin() {
      localStorage.clear();
      this.router.navigate(['login']);
  }

  yuubinbango(){
    let z1 = this.createMyPageGroup.controls.zipcode1.value;
    let z2 = this.createMyPageGroup.controls.zipcode2.value;
    const value = {
        zip1: z1,
        zip2: z2
    }
      // this.loading = true;
      this.baseService.post(this.API_URLS.address, value).subscribe(res => {
        this.loading = false;
        if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
          this.createMyPageGroup.controls.city.setValue(res.addressInfo.addressPref);
          this.createMyPageGroup.controls.street.setValue(res.addressInfo.addressTown);
          // this.createMyPageGroup.controls.apartment.setValue(res.addressInfo.addressBldg);
        }else{
        }
      });
  }
}
