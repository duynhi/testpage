import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS, MESSAGE, CALENDARJP } from 'src/app/utils/common-constant';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MessageService } from 'primeng/components/common/messageservice';
import { Helper } from 'src/app/utils/common-function';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-infor-family-update',
  templateUrl: './customer-infor-family-update.component.html',
  styleUrls: ['./customer-infor-family-update.component.scss']
})
export class CustomerInforFamilyUpdateComponent implements OnInit, OnDestroy {
  myPageUserInfo: any;
  defaultDate: any;
  listFamily = [];
  selectItemInfo: any;
  infoFamilyGroup: any;
  sub: any;
  dataFamily: any;
  helper = Helper;
  id: number;
  API_URLS = API_URLS;
  MESSAGE = MESSAGE;
  relations: SelectItem[] = [{value: '', label: ''}];
  genders: SelectItem[] = [];
  gendersRoot: SelectItem[] = [];
  relationsRoot: SelectItem[] = [{value: '', label: '以下からご選択ください'}];
  CALENDARJP = CALENDARJP;
  maxDate = new Date();
  years: SelectItem[] = [{label: '', value: null}];
  months: SelectItem[] = [{label: '', value: null}];
  days: SelectItem[] = [{label: '', value: null}];
  selectedGender: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private baseService: BaseService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.selectItemInfo = JSON.parse(localStorage.getItem('SelectItemInfo'));
      this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
      this.initForm();
      this.getDataDisplay();
      this.initTimeDropdown();
    });
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

  changeRelation() {
    if (this.f.relation.value === '') {
      this.genders = this.gendersRoot;
      this.relations = this.relationsRoot;
      this.selectedGender = '';
    } else {
      this.genders = this.helper.filterGender(this.f.relation.value);
    }
  }

  changeGender(v) {
    if (v === '') {
      this.relations = this.relationsRoot;
    } else {
      this.selectedGender = v;
      this.relations = [];
      let temp = [];
      temp = this.helper.filterRelation(v);
      temp.forEach((relation) => {
        if (relation.value !== '0') {
          this.relations.push(relation);
        }
      });
    }
  }

  initForm() {
    this.infoFamilyGroup = this.formBuilder.group({
      nameFirst: ['', [Validators.required, Validators.maxLength(50)]],
      nameLast: ['', [Validators.required, Validators.maxLength(50)]],
      nameKanaFirst: ['', [Validators.maxLength(50), Validators.pattern('^[ぁ-んー 　]*$')]],
      nameKanaLast: ['', [Validators.maxLength(50), Validators.pattern('^[ぁ-んー 　]*$')]],
      relation: ['', [Validators.required]],
      year: ['', [Validators.required]],
      month: ['', [Validators.required]],
      day: ['', [Validators.required]],
    });
  }
  get f() { return this.infoFamilyGroup.controls; }

  getDataDisplay() {
    const value = {};
    this.baseService.post(this.API_URLS.display, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        res.selectItemInfo.sexfSelectList.forEach(gender => {
          this.gendersRoot.push({label: gender.name, value: gender.reserve});
          this.genders = this.gendersRoot;
        });
        this.selectItemInfo.relationSelectList.forEach((relation) => {
          if (relation.selNo !== 0) {
            this.relationsRoot.push({value: relation.selNo.toString(), label: relation.name});
            this.relations = this.relationsRoot;
          }
        });
        this.listFamily = this.myPageUserInfo.familyList;
        if (this.id !== 0) {
          this.listFamily.forEach((family) => {
            if (family.familyNo === this.id) {
              this.dataFamily = family;
              this.selectedGender = this.dataFamily.sex;
            }
          });
          if (this.dataFamily) {
            this.mapDataInit();
          }
        }
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

  mapDataInit() {
    this.f.nameFirst.setValue(this.dataFamily.firstName);
    this.f.nameLast.setValue(this.dataFamily.lastName);
    this.f.nameKanaFirst.setValue(this.dataFamily.firstNameKana);
    this.f.nameKanaLast.setValue(this.dataFamily.lastNameKana);
    this.f.relation.setValue(this.dataFamily.relation);
    this.f.year.setValue(parseInt(this.dataFamily.birthday.slice(0, 4), 10));
    this.changeYear();
    this.f.month.setValue(this.dataFamily.birthday.slice(4, 6));
    this.changeMonth();
    this.f.day.setValue(this.dataFamily.birthday.slice(6, 8));
    this.changeRelation();
    this.changeGender(this.dataFamily.sex);
  }

  saveFamily() {
    if (this.id !== 0) {
      this.myPageUserInfo.familyList.forEach((family) => {
        if (this.id === family.familyNo) {
          family.lastName = this.f.nameLast.value;
          family.firstName = this.f.nameFirst.value;
          family.lastNameKana	= this.f.nameKanaLast.value;
          family.firstNameKana = this.f.nameKanaFirst.value;
          family.relation = this.f.relation.value.toString();
          family.agentCd = localStorage.getItem('agentCd');
          family.sex = this.selectedGender;
          family.birthday = this.infoFamilyGroup.controls.year.value +
          this.infoFamilyGroup.controls.month.value + this.infoFamilyGroup.controls.day.value;
        }
      });
    } else {
      this.myPageUserInfo.familyList.push(
        {
          familyNo: null,
          lastName : this.f.nameLast.value,
          firstName : this.f.nameFirst.value,
          lastNameKana	: this.f.nameKanaLast.value,
          firstNameKana : this.f.nameKanaFirst.value,
          relation : this.f.relation.value.toString(),
          sex : this.selectedGender,
          agentCd: localStorage.getItem('agentCd'),
          birthday : this.infoFamilyGroup.controls.year.value +
          this.infoFamilyGroup.controls.month.value + this.infoFamilyGroup.controls.day.value
        }
      );
    }
    console.log('this.myPageUserInfo.familyList', this.myPageUserInfo.familyList);
    const value = {
      token: localStorage.getItem('jwtToken'),
      myPageUserInfo: {
        myPageNo: this.myPageUserInfo.myPageNo,
        phone: this.myPageUserInfo.phone,
        zip1: this.myPageUserInfo.zipcode1,
        zip2: this.myPageUserInfo.zipcode2,
        addressPref: this.myPageUserInfo.city,
        addressTown: this.myPageUserInfo.street,
        addressBldg: this.myPageUserInfo.apartment,
        familyList: this.myPageUserInfo.familyList,
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
