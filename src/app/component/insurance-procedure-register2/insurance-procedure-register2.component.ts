import { Component, OnInit, ViewEncapsulation, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS, MESSAGE, CALENDARJP } from 'src/app/utils/common-constant';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-insurance-procedure-register2',
  templateUrl: './insurance-procedure-register2.component.html',
  styleUrls: ['./insurance-procedure-register2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InsuranceProcedureRegister2Component implements OnInit {
  collapsedAddress = false;
  collapsedPhone = false;
  indexFamily: number;
  myPageUserInfo: any;
  familyList = [];
  desPerson: number;
  familyListInput = [];
  selectItemInfo: any;
  index = 0;
  API_URLS = API_URLS;
  loading = false;
  keiyakuList = [];
  insuranceGroup: any;
  statusColorKeiyaku = [];
  statusColorFamily = [];
  statusColorFamilyInput = [];
  listChooseKeiyaku = [];
  listChooseKeiyakuName = [];
  cities: SelectItem[] = [];
  listContactType: any;
  listPhoneType: any;
  sub: any;
  id: number;
  date: any;
  allKeiyaku = [];
  showTextbox = false;
  listChooseFamily = [];
  listNameChooseFamily = [];
  listChooseFamilyInput = [];
  listStatusKeiyakuFamily = [];
  MESSAGE = MESSAGE;
  listSelect: any;
  CALENDARJP = CALENDARJP;
  maxDate: Date;
  years: SelectItem[] = [{ label: '', value: null }];
  months: SelectItem[] = [{ label: '', value: null }];
  days: SelectItem[] = [{ label: '', value: null }];
  relations: SelectItem[] = [{ label: '以下からご選択ください', value: null }];
  chooseDestination = false;
  chooseDestinationPhone = false;
  confirm = false;
  success = false;
  valueFamilyInput = '';
  insuranceProcedureKeiyakuList = [];
  relationSelected: string;
  constructor(private messageService: MessageService,
              private baseService: BaseService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private rd: Renderer2) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
      this.selectItemInfo = JSON.parse(localStorage.getItem('SelectItemInfo'));
      this.selectItemInfo.relationSelectList.forEach(relation => {
        this.relations.push({ label: relation.name, value: relation.selNo });
      });
      this.listContactType = this.selectItemInfo.contactTypeSelectList;
      this.listPhoneType = this.selectItemInfo.phoneTypeSelectList;
      this.familyList = this.myPageUserInfo.familyList;
      this.familyListInput = this.myPageUserInfo.familyList.slice(0);
      this.familyListInput.push({ familyNo: null, lastName: 'その他' });
      // this.desPerson = this.familyListInput[0].familyNo;
      this.getDataDisplay();
      this.initForm();
      this.maxDate = new Date();
      this.initTimeDropdown();
      this.familyList.forEach((family, i) => {
        this.statusColorFamily.push({
          index: i, keiyakuNo: family.familyNo, lastName: family.lastName,
          firstName: family.firstName, status: false
        });
      });
      this.familyListInput.forEach((family, i) => {
        this.statusColorFamilyInput.push({ index: i, keiyakuNo: family.familyNo, status: false });
      });
      this.getAllKeiyaku();
      // this.statusColorFamily[0].status = true;
    });
  }

  getAllKeiyaku() {
    this.listStatusKeiyakuFamily = [];
    this.familyList.forEach((family, i) => {
      this.getListKeiyaku(family.familyNo);
    });
  }

  getDataDisplay() {
    const value = {};
    this.baseService.post(this.API_URLS.display, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.listSelect = res;
        res.selectItemInfo.prefSelectList.forEach(city => {
          this.cities.push({ label: city.name, value: city.name });
        });
        this.insuranceGroup.controls.destAddressPref.setValue(this.cities[0].value);
        this.insuranceGroup.controls.newAddressPref.setValue(this.cities[0].value);
      } else if ((res.errorList && res.errorList.length > 0)) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  changeStatusPhone() {
    this.collapsedPhone = !this.collapsedPhone;
  }

  changeStatusAddress() {
    this.collapsedAddress = !this.collapsedAddress;
  }


  changeDesPerson(familyNo) {
    if (familyNo !== -1) {
      this.insuranceGroup.controls.familyInput.clearValidators();
      this.insuranceGroup.controls.familyInput.setErrors(null);
      this.insuranceGroup.controls.familyInput.reset('');
      this.insuranceGroup.controls.familyInput.markAsPristine();
      this.desPerson = familyNo;
    } else {
      this.insuranceGroup.controls.familyInput.setValidators([Validators.maxLength(50), Validators.required]);
      this.desPerson = familyNo;
    }
    console.log(this.insuranceGroup.controls.familyInput);
  }
  chooseShowDestination(value) {
    this.chooseDestination = value;
    if (!this.chooseDestination) {
      this.insuranceGroup.controls.destZip1.clearValidators();
      this.insuranceGroup.controls.destZip1.setErrors(null);
      this.insuranceGroup.controls.destZip2.clearValidators();
      this.insuranceGroup.controls.destZip2.setErrors(null);
      this.insuranceGroup.controls.destAddressTown.clearValidators();
      this.insuranceGroup.controls.destAddressTown.setErrors(null);
      this.insuranceGroup.controls.destAddressBldg.clearValidators();
      this.insuranceGroup.controls.destAddressBldg.setErrors(null);

      this.insuranceGroup.controls.destZip1.reset('');
      this.insuranceGroup.controls.destZip1.markAsPristine();
      this.insuranceGroup.controls.destZip2.reset('');
      this.insuranceGroup.controls.destZip2.markAsPristine();
      this.insuranceGroup.controls.destAddressTown.reset('');
      this.insuranceGroup.controls.destAddressTown.markAsPristine();
      this.insuranceGroup.controls.destAddressBldg.reset('');
      this.insuranceGroup.controls.destAddressBldg.markAsPristine();
    } else {
      this.insuranceGroup.controls.destZip1.setValidators([Validators.required]);
      this.insuranceGroup.controls.destZip1.setValidators([Validators.pattern('^[0-9]+$')]);
      this.insuranceGroup.controls.destZip2.setValidators([Validators.required]);
      this.insuranceGroup.controls.destZip2.setValidators([Validators.pattern('^[0-9]+$')]);
      this.insuranceGroup.controls.destAddressTown.setValidators([Validators.required]);
      // this.insuranceGroup.controls.destAddressBldg.setValidators([Validators.required]);
    }
    console.log(this.insuranceGroup.controls);
  }
  chooseShowDestinationPhone(value) {
    this.chooseDestinationPhone = value;
    if (!this.chooseDestinationPhone) { 
      this.insuranceGroup.controls.destPhone.clearValidators();
      this.insuranceGroup.controls.destPhone.setValidators([Validators.maxLength(50), Validators.pattern('^[0-9-]+$')]);
      this.insuranceGroup.controls.destPhone.setErrors(null);
      this.insuranceGroup.controls.destPhone.reset('');
      this.insuranceGroup.controls.destPhone.markAsPristine();
    } else {
      this.insuranceGroup.controls.destPhone.setValidators([Validators.required, Validators.pattern('^[0-9-]+$'), Validators.maxLength(50)]);
    }
  }
  getListKeiyaku(familyNo) {
    this.loading = true;
    const value = {
      token: localStorage.getItem('jwtToken'),
      listKeiyakuInfo: {
        myPageNo: this.myPageUserInfo.myPageNo,
        // hihoFamilyNo: familyNo,
        keiyakuFamilyNo: familyNo
      }
    };
    this.baseService.post(this.API_URLS.getListKeiyaku, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        if (res.keiyakuList.length > 0) {
          this.listStatusKeiyakuFamily.push({familyNo: familyNo, status: true});
        } else {
          this.listStatusKeiyakuFamily.push({familyNo: familyNo, status: false});
        }
        this.mapDataListKeiyaku(res.keiyakuList).forEach((keiyaku) => {
          this.allKeiyaku.push(keiyaku);
        });
        // this.changeColourFamily(0);
      }
      if (res.errorList && res.errorList.length > 0) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
      this.loading = false;
    });
  }

  checkKeiyakuFamilyStatus(i) {
    let temp;
    this.listStatusKeiyakuFamily.forEach((status) => {
      if (i === status.familyNo) {
        temp = status.status;
      }
    });
    return !temp;
  }

  mapDataListKeiyaku(data) {
    data.forEach((keiyaku, i) => {
      this.selectItemInfo.haraikataSelectList.forEach((haraikata) => {
        if (keiyaku.haraikata && keiyaku.haraikata.toString() === haraikata.selNo.toString()) {
          keiyaku.haraikata = haraikata.name;
        }
      });
      this.selectItemInfo.companyfSelectList.forEach((company) => {
        if (keiyaku.companyCd && keiyaku.companyCd.toString() === company.companyCd.toString()) {
          keiyaku.companyCd = company.companyName;
        }
      });
      this.selectItemInfo.keiyakuStatusSelectList.forEach((status) => {
        if (keiyaku.status && keiyaku.status.toString() === status.selNo.toString()) {
          keiyaku.status = status.name;
        }
      });
      this.selectItemInfo.currencySelectList.forEach((currency) => {
        if (keiyaku.currencyF && keiyaku.currencyF.toString() === currency.selNo.toString()) {
          keiyaku.currencyF = currency.name;
        }
      });
    });
    return data;
  }

  showError(message) {
    this.messageService.add({ severity: 'error', detail: message });
  }

  changeColour(i) {
    if (this.statusColorKeiyaku[i]) {
      this.statusColorKeiyaku[i].status = !this.statusColorKeiyaku[i].status;
      // if (this.statusColorKeiyaku[i].status) {
      //   this.rd.setStyle(product, 'background-color', '#00FFFF');
      // } else {
      //   this.rd.setStyle(product, 'background-color', '#FFF');
      // }
      this.listChooseKeiyaku = [];
      this.listChooseKeiyakuName = [];
      this.statusColorKeiyaku.forEach((status) => {
        if (status.status === true) {
          this.listChooseKeiyaku.push(status.keiyakuNo);
          this.listChooseKeiyakuName.push(status.keiyakuName);
        }
      });
    }
  }

  changeColourFamilyInput(i, familyNo, familyInputID) {
    this.listChooseFamilyInput = [];
    this.statusColorFamilyInput[i].status = !this.statusColorFamilyInput[i].status;
    // if (this.statusColorFamilyInput[i].status) {
    //   this.rd.setStyle(familyInputID, 'background-color', '#00FFFF');
    // } else {
    //   this.rd.setStyle(familyInputID, 'background-color', '#FFF');
    // }
    this.statusColorFamilyInput.forEach((status) => {
      if (status.status === true) {
        this.listChooseFamilyInput.push(status.keiyakuNo);
      }
    });
    if (this.statusColorFamilyInput[(this.statusColorFamilyInput.length - 1)].status) {
      this.showTextbox = true;
    } else {
      this.showTextbox = false;
    }
  }

  changeColourFamily(i, keiyakuFamily) {
    this.listChooseFamily = [];
    this.listChooseKeiyaku = [];
    this.listChooseKeiyakuName = [];
    this.listNameChooseFamily = [];
    this.statusColorKeiyaku = [];
    this.statusColorFamily.forEach((family) => {
      family.status = false;
    });
    this.statusColorFamily[i].status = !this.statusColorFamily[i].status;
    // if (this.statusColorFamily[i].status) {
    //   this.rd.setStyle(familyID, 'background-color', '#00FFFF');
    // } else {
    //   this.rd.setStyle(familyID, 'background-color', '#FFF');
    // }
    // cons
    this.statusColorFamily.forEach((status) => {
      if (status.status === true) {
        this.listChooseFamily.push(status.keiyakuNo);
        this.listNameChooseFamily.push(status.lastName + ' ' + status.firstName + ' さま');
      }
    });
    // this.keiyakuList = this.allKeiyaku.filter((keiyaku) => {
    //   return this.listChooseFamily.includes(keiyaku.hihoFamilyNo);
    // });
    const value = {
      token: localStorage.getItem('jwtToken'),
      listKeiyakuInfo: {
        myPageNo: this.myPageUserInfo.myPageNo,
        // hihoFamilyNo: familyNo,
        keiyakuFamilyNo: keiyakuFamily
      }
    };
    this.loading = true;
    this.baseService.post(this.API_URLS.getListKeiyaku, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.keiyakuList = res.keiyakuList;
        this.mapDataListKeiyaku(this.keiyakuList);
        this.keiyakuList.forEach((keiyaku) => {
          this.statusColorKeiyaku.push({ index: i, keiyakuNo: keiyaku.keiyakuNo, keiyakuName: keiyaku.productName, status: false });
        });
      }
      if (res.errorList && res.errorList.length > 0) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
      this.loading = false;
    });
  }

  get f() { return this.insuranceGroup.controls; }

  initForm() {
    this.insuranceGroup = this.formBuilder.group({
      causeArisenDate: [''],
      year: [''],
      month: [''],
      day: [''],
      newPhone: ['', [Validators.maxLength(50), Validators.pattern('^[0-9-]+$')]],
      newZip1: ['', Validators.maxLength(3)],
      newZip2: ['', Validators.maxLength(4)],
      newAddressPref: [''],
      newAddressTown: ['', Validators.maxLength(400)],
      newAddressBldg: ['', Validators.maxLength(200)],
      destZip1: [''],
      destZip2: [''],
      destAddressPref: [''],
      destAddressTown: [''],
      destAddressBldg: [''],
      destPhone: ['', [Validators.maxLength(50), Validators.pattern('^[0-9-]+$')]],
      // applicantFamilyNo: ['', [Validators.required]],
      // appliccantFreeInput: ['', [Validators.required]],
      // familyInput: ['', [Validators.required]],
      familyInput: [''],
      relation: ['', [Validators.required]],
      relationOther: [''],
      accept: [''],
    });
    this.f.relationOther.disable();
    this.f.accept.setValue('0');
  }

  backToSelect(data) {
    if (data === 'choose') {
      this.confirm = false;
      this.success = false;
    } else if (data === 'select') {
      this.router.navigate(['/insurance-procedure-select']);
    }
  }

  saveInsurance() {
    this.insuranceProcedureKeiyakuList = [];
    this.listChooseKeiyaku.forEach((keiyaku) => {
      this.insuranceProcedureKeiyakuList.push({ keiyakuNo: keiyaku });
    });
    const value = {
      token: localStorage.getItem('jwtToken'),
      insuranceProcedureInfo: {
        insuranceProcedureNo: null,
        myPageNo: this.myPageUserInfo.myPageNo,
        conservationStatus: 0,
        procedureF: '2',
        requestF: '',
        causeArisenDate: this.f.year.value + this.f.month.value + this.f.day.value,
        keiyakuFamilyNo: this.listChooseFamily[0],
        applicantFamilyNo: this.desPerson,
        appliccantFreeInput: this.f.familyInput.value,
        applicantRelation: this.f.relation.value.toString(),
        newPhone: this.f.newPhone.value.toString(),
        newZip1: this.f.newZip1.value.toString(),
        newZip2: this.f.newZip2.value.toString(),
        newAddressPref: this.f.newAddressPref.value.toString(),
        newAddressTown: this.f.newAddressTown.value.toString(),
        newAddressBldg: this.f.newAddressBldg.value.toString(),
        destF: 0,
        destZip1: this.f.destZip1.value.toString(),
        destZip2: this.f.destZip2.value.toString(),
        destAddressPref: this.f.destAddressPref.value.toString(),
        destAddressTown: this.f.destAddressTown.value.toString(),
        destAddressBldg: this.f.destAddressBldg.value.toString(),
        phoneF: 0,
        phone: this.f.destPhone.value.toString(),
        insuranceProcedureKeiyakuList: this.insuranceProcedureKeiyakuList,
      }
    };
    // if (this.desPerson !== -1) {
    //   this.familyListInput.forEach((family) => {
    //     if (family.familyNo === this.desPerson) {
    //       value.insuranceProcedureInfo.appliccantFreeInput = family.firstName + family.lastName;
    //     }
    //   })
    // }

    this.baseService.post(this.API_URLS.saveInsurance, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.router.navigate(['/insurance-procedure-regist-success/2']);
      }
      if (res.errorList && res.errorList.length > 0) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
      this.loading = false;
    });
  }

  convertTime() {
    this.date = moment(this.insuranceGroup.controls.dob.value).format('YYYY-MM-DD');
  }

  getPhone() {
    const value = {

    };
    this.baseService.post(this.API_URLS.getListKeiyaku, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {

      }
      if (res.errorList && res.errorList.length > 0) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
      this.loading = false;
    });
  }

  initTimeDropdown() {
    const dateNow = new Date();
    for (let i = 1905; i <= 2050; i++) {
      this.years.push({ label: i.toString(), value: i });
    }
    this.f.month.disable();
    this.f.day.disable();
  }

  changeRelation() {
    this.relations.forEach((relation) => {
      if (this.f.relation.value === relation.value) {
          this.relationSelected = relation.label;
      }
      // if (this.f.relation.value === relation.value && this.f.relation.value !== 99) {
      //   this.relationSelected = relation.label;
      //   this.f.relationOther.disable();
      // } else if (this.f.relation.value === 99) {
      //   this.f.relationOther.enable()
      // }
    });

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
  goToConfirm() {
    window.scrollTo(0, 0);
    this.confirm = true;
    if (this.desPerson !== -1) {
      this.familyListInput.forEach((family) => {
        if (family.familyNo === this.desPerson) {
          this.valueFamilyInput = family.lastName + ' ' + family.firstName  +  ' さま';
        }
      });
    } else {
      this.valueFamilyInput = this.f.familyInput.value + ' さま';
    }
  }

  backToEdit() {
    this.confirm = false;
  }

  yuubinbango(){
    let z1 = this.insuranceGroup.controls.destZip1.value;
    let z2 = this.insuranceGroup.controls.destZip2.value;
    const value = {
        zip1: z1,
        zip2: z2
    }
    // this.loading = true;
    this.baseService.post(this.API_URLS.address, value).subscribe(res => {
      console.log(res);
      this.loading = false;
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.insuranceGroup.controls.destAddressPref.setValue(res.addressInfo.addressPref);
        this.insuranceGroup.controls.destAddressTown.setValue(res.addressInfo.addressTown);
        // this.createMyPageGroup.controls.apartment.setValue(res.addressInfo.addressBldg);
      }else{
        
      }
    });
  }
}

