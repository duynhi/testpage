import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS, MESSAGE, CALENDARJP } from 'src/app/utils/common-constant';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Hosho } from 'src/app/model/keiyaku';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Helper } from 'src/app/utils/common-function';
import * as moment from 'moment';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-product-change-info',
  templateUrl: './product-change-info.component.html',
  styleUrls: ['./product-change-info.component.scss'],
  providers: [ConfirmationService]
})
export class ProductChangeInfoComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  agentForm: FormGroup;
  helper = Helper;
  API_URLS = API_URLS;
  MESSAGE = MESSAGE;
  numberFamilyNew = 0;
  numberProductNew = 0;
  productName = '';
  listSelect: any;
  myPageUserInfo: any;
  listShukeiyaku = [];
  listHosho = [];
  listTokuyaku = [];
  listTokuyakuHosho = [];
  listAgent = [];
  dataProductFiltered = [];
  hoshoItem: Hosho;
  hoshoName = '';
  hoshoValue = '';
  tokuyakuHoshoNo: number;
  comment = '';
  tokuyakuName = '';
  tokuyakuHoshoName = '';
  tokuyakuHoshoValue = '';
  tokuyakuHoshoComment = '';
  tokuyakuNameEdit = '';
  tokuyakuUpdate: number;
  tokuyakuHoshoSeqNo: number;
  date = '';
  startDate = '';
  endDate = '';
  hihoFamilyNo = 0;
  hihoFamilyName = '';
  tokuyakuNo: number;
  tokuyakuSelNo: number;
  updateCount: '';
  currentUpdateTokuyaku: number;
  currentupdateHoshoTokuyaku: number;
  currentUpdateShukeiyaku: number;
  companyList: SelectItem[] = [{ label: '', value: null }];
  haraikataList: SelectItem[] = [{ label: '', value: null }];
  categoryList: SelectItem[] = [{ label: '', value: null }];
  productsList: SelectItem[] = [{ label: '', value: null }];
  statusList: SelectItem[] = [{ label: '', value: null }];
  kikanFList: SelectItem[] = [{ label: '', value: null }];
  currencyList: SelectItem[] = [{ label: '', value: null }];
  familyList: SelectItem[] = [{ label: '', value: null }];
  agentList: SelectItem[] = [{ label: '', value: null }];
  hoshoNo: number;
  seqNo: number;
  display = {
    status: false
  };
  data = {
    from: '',
    value: null
  };
  bodyValue: any;
  dataAgent: any;
  displayAddShukeiyaku = false;
  displayAddTokuyaku = false;
  displayHoshoList = false;
  displayTokuyakuList = false;
  displayTokuyakuHoshoList = false;
  displayTokuyakuHoshoListAdd = false;
  displayMapNewHoshoOfTokuyaku = false;
  displayUpdateHoshoOfTokuyaku = false;
  displayUpdateShukeiyaku = false;
  displayEditTokuyakuName = false;
  isErrorHoshoName = false;
  isErrorTokuyakuName = false;
  isErrorTokuyakuHoshoName = false;
  isErrorTokuyakuNameEdit = false;
  isErrorHokenP = false;
  displayAddHokenName = false;
  displayAddFamilyName = false;
  sub: any;
  maxDate: Date;
  newFamilyName = '';
  newHokenName = '';
  id: number;
  dataProduct: any;
  selectItemInfo: any;
  isValid110Hoken = false;
  isValid110Harai = false;
  acceptPolicy = false;
  isShowDate = false;
  phone: RegExp = /^[0-9-]+$/;
  calendarJP: any;
  CALENDARJP = CALENDARJP;
  yearsDate: SelectItem[] = [{label: '', value: null}];
  monthsDate: SelectItem[] = [{label: '', value: null}];
  daysDate: SelectItem[] = [{label: '', value: null}];
  yearsStartDate: SelectItem[] = [{label: '', value: null}];
  monthsStartDate: SelectItem[] = [{label: '', value: null}];
  daysStartDate: SelectItem[] = [{label: '', value: null}];
  yearsEndDate: SelectItem[] = [{label: '', value: null}];
  monthsEndDate: SelectItem[] = [{label: '', value: null}];
  daysEndDate: SelectItem[] = [{label: '', value: null}];
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private baseService: BaseService,
              public messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
      console.log(this.myPageUserInfo);
      this.selectItemInfo = JSON.parse(localStorage.getItem('SelectItemInfo'));
      this.initForm();
      this.mapDropdown();
      this.getAgentList();
      this.initHosho();
      this.initTimeDropdownDate();
      this.initTimeDropdownStartDate();
      this.initTimeDropdownEndDate();
      this.hihoFamilyNo = parseInt(localStorage.getItem('hihoFamily'), 10);
      if (this.hihoFamilyNo) {
        this.hihoFamilyName = localStorage.getItem('hihoFamilyName');
      } else {
        this.myPageUserInfo.familyList.forEach((family) => {
          if (family.relation === '0') {
            console.log('aaaaa', family.familyNo);
            this.hihoFamilyNo = family.familyNo;
            this.hihoFamilyName = family.lastName + '' + family.firstName;
          }
        });
      }
      this.getProductList();
    });
  }

  initTimeDropdownDate() {
    const dateNow = new Date();
    console.log( dateNow.getMonth());
    for ( let i = 1905; i <= 2050; i++) {
      this.yearsDate.push({label: i.toString(), value: i});
    }
    this.f.monthDate.disable();
    this.f.dayDate.disable();
  }

  getDaysDate(month, year) {
    this.f.dayDate.enable();
    const numberDate = new Date(year, month, 0).getDate();
    // let date = new Date();
    // let selectedM = parseInt(month);
    // let selectedY = parseInt(year);console.log(selectedY > date.getFullYear());
    // let index = selectedY > date.getFullYear() || selectedM > date.getMonth() + 1 ? 1 : date.getDate();
    this.daysDate = [{label: '', value: null}];
    for (let i = 1; i <= numberDate; i++) {
      if (i.toString().length === 1) {
        this.daysDate.push({label: '0' + i.toString(), value: '0' + i.toString()});
      } else {
        this.daysDate.push({label: i.toString(), value: i.toString()});
      }
    }
  }

  keyUpHokenP() {
    if (this.f.currency1.value) {
      if (this.f.currency2.value === 0) {
        this.isErrorHokenP = false;
      } else {
        this.isErrorHokenP = true;
      }
    }
  }

  changeCurrency() {
    if (this.f.currency2.value === 0) {
      if (this.f.currency1.value && parseInt(this.f.currency1.value, 10).toString() === this.f.currency1.value.toString()) {
        this.isErrorHokenP = false;
      } else {
        this.isErrorHokenP = true;
      }
    } else {
      this.isErrorHokenP = false;
    }
  }

  accept(acceptEvent) {
    console.log(acceptEvent);
    if (acceptEvent === '1') {
      this.acceptPolicy = true;
    } else {
      this.acceptPolicy = false;
    }
  }

  changeYearDate() {
    this.f.monthDate.enable();
    this.monthsDate = [{label: '', value: null}];
    // let firstMonth = this.f.yearDate.value > d.getFullYear() ? 1 : d.getMonth() + 1;
    for (let i = 1; i <= 12; i++) {
      if (i.toString().length === 1) {
        this.monthsDate.push({label: '0' + i.toString(), value: '0' + i.toString()});
      } else {
        this.monthsDate.push({label: i.toString(), value: i.toString()});
      }
    }
    if (this.f.monthDate.value) {
      this.getDaysDate(this.f.monthDate.value, this.f.yearDate.value);
    }
  }

  changeMonthDate() {
    if (this.f.yearDate.value) {
      this.getDaysDate(this.f.monthDate.value, this.f.yearDate.value);
    }
  }

  initTimeDropdownStartDate() {
    const dateNow = new Date();
    console.log( dateNow.getMonth());
    for ( let i = dateNow.getFullYear(); i <= 2050; i++) {
      this.yearsStartDate.push({label: i.toString(), value: i});
    }
    this.f.monthStartDate.disable();
    this.f.dayStartDate.disable();
  }

  getDaysStartDate(month, year) {
    this.f.dayStartDate.enable();
    const numberStartDate = new Date(year, month, 0).getDate();
    this.daysStartDate = [{label: '', value: null}];
    for (let i = 1; i <= numberStartDate; i++) {
      if (i.toString().length === 1) {
        this.daysStartDate.push({label: '0' + i.toString(), value: '0' + i.toString()});
      } else {
        this.daysStartDate.push({label: i.toString(), value: i.toString()});
      }
    }
  }

  changeYearStartDate() {
    this.f.monthStartDate.enable();
    this.monthsStartDate = [{label: '', value: null}];
    for (let i = 1; i <= 12; i++) {
      if (i.toString().length === 1) {
        this.monthsStartDate.push({label: '0' + i.toString(), value: '0' + i.toString()});
      } else {
        this.monthsStartDate.push({label: i.toString(), value: i.toString()});
      }
    }
    if (this.f.monthStartDate.value) {
      this.getDaysStartDate(this.f.monthStartDate.value, this.f.yearStartDate.value);
    }
  }

  changeMonthStartDate() {
    if (this.f.yearStartDate.value) {
      this.getDaysStartDate(this.f.monthStartDate.value, this.f.yearStartDate.value);
    }
  }

  initTimeDropdownEndDate() {
    const dateNow = new Date();
    console.log( dateNow.getMonth());
    for ( let i = dateNow.getFullYear(); i <= 2050; i++) {
      this.yearsEndDate.push({label: i.toString(), value: i});
    }
    this.f.monthEndDate.disable();
    this.f.dayEndDate.disable();
  }

  getDaysEndDate(month, year) {
    this.f.dayEndDate.enable();
    const numberEndDate = new Date(year, month, 0).getDate();
    this.daysEndDate = [{label: '', value: null}];
    for (let i = 1; i <= numberEndDate; i++) {
      if (i.toString().length === 1) {
        this.daysEndDate.push({label: '0' + i.toString(), value: '0' + i.toString()});
      } else {
        this.daysEndDate.push({label: i.toString(), value: i.toString()});
      }
    }
  }

  changeYearEndDate() {
    this.f.monthEndDate.enable();
    this.monthsEndDate = [{label: '', value: null}];
    for (let i = 1; i <= 12; i++) {
      if (i.toString().length === 1) {
        this.monthsEndDate.push({label: '0' + i.toString(), value: '0' + i.toString()});
      } else {
        this.monthsEndDate.push({label: i.toString(), value: i.toString()});
      }
    }
    if (this.f.monthEndDate.value) {
      this.getDaysEndDate(this.f.monthEndDate.value, this.f.yearEndDate.value);
    }
  }

  changeMonthEndDate() {
    if (this.f.yearEndDate.value) {
      this.getDaysEndDate(this.f.monthEndDate.value, this.f.yearEndDate.value);
    }
  }

  initHosho() {
    console.log('vào add other');
    this.listHosho.push({ hoshoName: '手で入力する', hoshoNo: 0 });
    this.listTokuyakuHosho.push({ tokuyakuName: '手で入力する', tokuyakuNo: 0 });
  }

  get f() { return this.productForm.controls; }

  mapDataEdit() {
    const value = {
      token: localStorage.getItem('jwtToken'),
      keiyakuInfo: {
        myPageNo: this.myPageUserInfo.myPageNo,
        keiyakuNo: this.id,
        hihoFamilyNo: parseInt(localStorage.getItem('hihoFamily'), 10)
      }
    };
    this.baseService.post(this.API_URLS.getProduct, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        res = res.keiyakuInfo;
        console.log(res);
        this.f.company.setValue(res.companyCd);
        this.f.hokenCategoryType.setValue(res.hoshoCategoryF);
        if (parseInt(res.hoshoCategoryF, 10) > 3) {
          this.isShowDate = true;
        }
        this.filterProduct();
        this.productsList.pop();
        if (res.productCd === '99999') {
          this.productsList.push({value: res.productCd, label: res.productName});
          this.f.hokenName.setValue('99999');
        } else {
          this.f.hokenName.setValue(res.productCd);
        }
        if (res.keiyakuFamilyNo === null) {
          this.familyList.pop();
          this.familyList.push({value: 'new1', label: res.keiyakuFamilyName});
          this.f.nameBook.setValue('new1');
          this.familyList.push({ label: 'その他', value: 'add' });
        } else {
          this.f.nameBook.setValue(res.keiyakuFamilyNo);
        }
        this.productsList.push({ label: 'テキスト入力', value: 'add' });
        this.f.stockNumber.setValue(res.policyNo);
        this.f.statusBook.setValue(res.status);
        this.f.hihoName.setValue(res.hihoFamilyName);
        if (res.contractDate && parseInt(this.f.hokenCategoryType.value, 10) < 3) {
          this.f.yearDate.setValue(parseInt(res.contractDate.slice(0, 4), 10));
          this.changeYearDate();
          this.f.monthDate.setValue(res.contractDate.slice(4, 6));
          this.changeMonthDate();
          this.f.dayDate.setValue(res.contractDate.slice(6, 8));
        } else {
          this.initTimeDropdownDate();
        }

        if (res.contractDate && parseInt(this.f.hokenCategoryType.value, 10) > 3) {
          this.f.yearStartDate.setValue(parseInt(res.contractDate.slice(0, 4), 10));
          this.changeYearStartDate();
          this.f.monthStartDate.setValue(res.contractDate.slice(4, 6));
          this.changeMonthStartDate();
          this.f.dayStartDate.setValue(res.contractDate.slice(6, 8));
        } else {
          this.initTimeDropdownStartDate();
        }

        if (res.hokenEndDate) {
          this.f.yearEndDate.setValue(parseInt(res.hokenEndDate.slice(0, 4), 10));
          this.changeYearEndDate();
          this.f.monthEndDate.setValue(res.hokenEndDate.slice(4, 6));
          this.changeMonthEndDate();
          this.f.dayEndDate.setValue(res.hokenEndDate.slice(6, 8));
        } else {
          this.initTimeDropdownEndDate();
        }
        this.f.hokenkikan1.setValue(res.hkikan);
        this.f.hokenkikan2.setValue(res.hkikanF);
        if ((this.f.hokenkikan2.value && this.f.hokenkikan2.value.toString() === '3') ||
        (this.f.hokenkikan2.value && this.f.hokenkikan2.value.toString() === '8')) {
          this.f.hokenkikan1.disable();
        }
        this.f.haraiKikan1.setValue(res.pkikan);
        this.f.haraiKikan2.setValue(res.pkikanF);
        if ((this.f.haraiKikan2.value && this.f.haraiKikan2.value.toString() === '3') ||
        (this.f.haraiKikan2.value && this.f.haraiKikan2.value.toString() === '8')) {
          this.f.haraiKikan1.disable();
        }
        this.f.haraikata.setValue(res.haraikata);
        this.f.currency1.setValue(res.hokenP);
        this.f.currency2.setValue(parseInt(res.currencyF, 10));
        this.listShukeiyaku = res.hoshoList ? res.hoshoList : [];
        this.listTokuyaku = res.tokuyakuList ? res.tokuyakuList : [];
        this.updateCount = res.updateCount;
        if (res.AgentInfo && res.AgentInfo.agentNo === null) {
          this.agentForm.controls.agent.setValue('new');
          this.agentForm.controls.nameAgent.setValue(res.AgentInfo.agentName);
          this.agentForm.controls.phoneAgent.setValue(res.AgentInfo.phone);
          this.agentForm.controls.nameTanto.setValue(res.AgentInfo.tantoName);
          this.agentForm.controls.URL.setValue(res.AgentInfo.url);
        } else if (res.AgentInfo === null) {
          this.agentForm.controls.agent.setValue('');
          // this.agentForm.controls.nameAgent.setValue(res.AgentInfo.agentName);
          // this.agentForm.controls.phoneAgent.setValue(res.AgentInfo.phone);
          // this.agentForm.controls.nameTanto.setValue(res.AgentInfo.tantoName);
          // this.agentForm.controls.URL.setValue(res.AgentInfo.url);
        } else {
          this.agentForm.controls.agent.setValue(res.AgentInfo.agentNo);
        }
        this.checkAddNewAgent();
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


  initForm() {
    this.productForm = this.formBuilder.group({
      company: ['', [Validators.required]],
      hokenCategoryType: ['', Validators.required],
      hokenName: ['', Validators.required],
      stockNumber: ['', [Validators.maxLength(50)]],
      statusBook: ['', Validators.required],
      nameBook: [''],
      hihoName: [''],
      date: [''],
      yearDate: [''],
      monthDate: [''],
      dayDate: [''],
      yearStartDate: [''],
      monthStartDate: [''],
      dayStartDate: [''],
      yearEndDate: [''],
      monthEndDate: [''],
      dayEndDate: [''],
      hokenkikan1: [''],
      hokenkikan2: [''],
      haraiKikan1: [''],
      haraiKikan2: [''],
      haraikata: [''],
      currency1: [''],
      currency2: [''],
      startDate: [''],
      endDate: [''],
      acceptF: ['']
    });
    if (this.id === 0) {
      this.productForm.controls.acceptF.setValue('0');
    } else {
      this.productForm.controls.acceptF.setValue('1');
    }
    this.agentForm = this.formBuilder.group({
      // agent: ['', [Validators.required]],
      agent: [''],
      nameAgent: ['', [Validators.maxLength(50)]],
      phoneAgent: ['', [Validators.maxLength(50), Validators.pattern('^[0-9-]+$')]],
      nameTanto: ['', Validators.maxLength(50)],
      URL: ['', Validators.maxLength(50)],
    });
    this.agentForm.controls.nameAgent.disable();
    this.agentForm.controls.phoneAgent.disable();
    this.agentForm.controls.nameTanto.disable();
    this.agentForm.controls.URL.disable();
    this.productForm.controls.hokenName.disable();
  }

  getProductList() {
    const value = {
      token: localStorage.getItem('jwtToken'),
      listKeiyakuInfo: {
        myPageNo: this.myPageUserInfo.myPageNo,
        hihoFamilyNo: this.hihoFamilyNo
      }
    };
    this.baseService.post(this.API_URLS.getListProduct, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.dataProduct = res.productList;
        if (this.id !== 0) {
          this.mapDataEdit();
        } else {
          if (localStorage.getItem('company-start') === 'null') {
            this.productForm.controls.company.setValue(null);
          } else {
            this.productForm.controls.company.setValue(localStorage.getItem('company-start'));
          }
          console.log('company-start', localStorage.getItem('company-start'));
          this.filterProduct();
        }
      } else if ((res.errorList && res.errorList.length > 0)) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  getAgentList() {
    const value = {
      token: localStorage.getItem('jwtToken'),
      myPageNo: this.myPageUserInfo.myPageNo,
    };
    this.baseService.post(this.API_URLS.getListAgent, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.listAgent = res.agentList;
        console.log('this.listAgent', this.listAgent);
        this.listAgent.forEach((agent) => {
          this.agentList.push({ label: agent.agentName, value: agent.agentNo });
        });
        this.agentList.push({ label: '新しく連絡先を登録する。', value: 'new' });
      } else if ((res.errorList && res.errorList.length > 0)) {
        this.agentList.push({ label: '新しく連絡先を登録する。', value: 'new' });
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  changeCategory() {
    if (parseInt(this.f.hokenCategoryType.value, 10) > 3) {
      this.isShowDate = true;
    } else {
      this.isShowDate = false;
    }
  }

  validate110(value) {
    // console.log();
    if (value === 'hokenkikan') {
      if (parseInt(this.f.hokenkikan1.value, 10) > 110) {
        this.isValid110Hoken = true;
      } else {
        this.isValid110Hoken = false;
      }
    }
    if (value === 'haraiKikan') {
      if (parseInt(this.f.haraiKikan1.value, 10) > 110) {
        this.isValid110Harai = true;
      } else {
        this.isValid110Harai = false;
      }
    }
  }

  mapDropdown() {
    this.selectItemInfo.companyfSelectList.forEach(company => {
      this.companyList.push({ label: company.companyName, value: company.companyCd });
    });
    this.selectItemInfo.haraikataSelectList.forEach(harai => {
      this.haraikataList.push({ label: harai.name, value: harai.selNo.toString() });
    });
    // this.selectItemInfo.productSelectList.forEach(product => {
    //   this.productsList.push({ label: product.productName, value: product.productName });
    // });
    this.selectItemInfo.keiyakuStatusSelectList.forEach(status => {
      this.statusList.push({ label: status.name, value: status.selNo.toString() });
    });
    this.selectItemInfo.kikanFStatusSelectList.forEach(kikan => {
      this.kikanFList.push({ label: kikan.name, value: kikan.selNo.toString() });
    });
    this.selectItemInfo.hoshoCategorySelectList.forEach(category => {
      this.categoryList.push({ label: category.name, value: category.selNo.toString() });
    });
    this.selectItemInfo.currencySelectList.forEach(currency => {
      this.currencyList.push({ label: currency.name, value: currency.selNo });
      console.log('this.currencyList', this.currencyList);
    });
    this.myPageUserInfo.familyList.forEach(person => {
      this.familyList.push({ label: person.lastName + ' ' + person.firstName, value: person.familyNo });
    });
    this.familyList.push({ label: 'その他', value: 'add' });
  }

  changeKikanF(nameControl) {
    if (nameControl === 'hokenkikan') {
      if (this.f.hokenkikan2.value === '3' || this.f.hokenkikan2.value === '8') {
        this.f.hokenkikan1.disable();
        this.f.hokenkikan1.setValue('');
        this.isValid110Hoken = false;
      } else {
        this.f.hokenkikan1.enable();
      }
    }
    if (nameControl === 'haraiKikan') {
      if (this.f.haraiKikan2.value === '3' || this.f.haraiKikan2.value === '8') {
        this.f.haraiKikan1.disable();
        this.f.haraiKikan1.setValue('');
        this.isValid110Harai = false;
      } else {
        this.f.haraiKikan1.enable();
      }
    }
  }

  checkAddNewAgent() {
    if (this.agentForm.controls.agent.value === null) {
      this.agentForm.controls.nameAgent.setValue('');
      this.agentForm.controls.phoneAgent.setValue('');
      this.agentForm.controls.nameTanto.setValue('');
      this.agentForm.controls.URL.setValue('');
      this.dataAgent = null;
    } else if (this.agentForm.controls.agent.value === 'new') {
      this.agentForm.controls.nameAgent.setValidators([Validators.required, Validators.maxLength(50)]);
      this.agentForm.controls.nameAgent.enable();
      this.agentForm.controls.phoneAgent.enable();
      this.agentForm.controls.nameTanto.enable();
      this.agentForm.controls.URL.enable();
      this.agentForm.controls.nameAgent.setValue('');
      this.agentForm.controls.phoneAgent.setValue('');
      this.agentForm.controls.nameTanto.setValue('');
      this.agentForm.controls.URL.setValue('');
    } else {
      this.listAgent.forEach((agent) => {
        this.agentForm.controls.nameAgent.reset('');
        this.agentForm.controls.nameAgent.clearValidators();
        this.agentForm.controls.nameAgent.setValidators(Validators.maxLength(50));
        if (agent.agentNo === this.agentForm.controls.agent.value) {
          this.dataAgent = {
            agentNo: agent.agentNo ? agent.agentNo : 0,
            agentName: agent.agentName ? agent.agentName : '',
            phone: agent.phone ? agent.phone : '',
            tantoName: agent.tantoName ? agent.tantoName : '',
            url: agent.url ? agent.url : '',
          };
        }
      });
      this.agentForm.controls.nameAgent.disable();
      this.agentForm.controls.phoneAgent.disable();
      this.agentForm.controls.nameTanto.disable();
      this.agentForm.controls.URL.disable();
      this.agentForm.controls.nameAgent.setValue(this.dataAgent && this.dataAgent.agentName ? this.dataAgent.agentName : '');
      this.agentForm.controls.phoneAgent.setValue(this.dataAgent && this.dataAgent.phone ? this.dataAgent.phone : '');
      this.agentForm.controls.nameTanto.setValue(this.dataAgent && this.dataAgent.tantoName ? this.dataAgent.tantoName : '');
      this.agentForm.controls.URL.setValue(this.dataAgent && this.dataAgent.url ? this.dataAgent.url : '');
    }
  }

  filterProduct() {
    if (this.productForm.controls.company.value === null) {
      this.productForm.controls.hokenName.disable();
      return;
    } else {
      this.productForm.controls.hokenName.enable();
      this.productsList = [{ label: '', value: null }];
      this.dataProduct.forEach(product => {
        if (this.productForm.controls.company.value === product.companyCd) {
          this.dataProductFiltered.push(product);
          this.productsList.push({ label: product.productName, value: product.productCd });
        }
      });
    }
    this.productsList.push({ label: 'テキスト入力', value: 'add' });
  }

  addKeiyakuSha() {
    if (this.f.nameBook.value === 'add') {
      this.displayAddFamilyName = true;
      this.f.nameBook.setValue(null);
    }
  }

  addNewFamilyName() {
    this.numberFamilyNew = this.numberFamilyNew + 1;
    this.familyList[this.familyList.length - 1] = { label: this.newFamilyName, value: 'new' + this.numberFamilyNew };
    this.familyList.push({ label: 'その他', value: 'add' });
    this.f.nameBook.setValue('new' + this.numberFamilyNew);
    this.displayAddFamilyName = false;
    this.newFamilyName = '';
  }

  backNewFamilyName() {
    this.displayAddFamilyName = false;
    this.newFamilyName = '';
    this.f.nameBook.setValue(null);
  }

  addNewHokenName() {
    this.productName = this.newHokenName;
    this.numberProductNew = this.numberProductNew + 1;
    this.productsList[this.productsList.length - 1] = { label: this.newHokenName, value: 'new' + this.numberProductNew  };
    this.productsList.push({ label: 'テキスト入力', value: 'add' });
    this.f.hokenName.setValue('new' + this.numberProductNew );
    this.displayAddHokenName = false;
    this.newHokenName = '';
  }

  backNewHokenName() {
    this.displayAddHokenName = false;
    this.newHokenName = '';
    this.f.hokenName.setValue(null);
  }

  addProduct() {
    if (this.f.hokenName.value === 'add') {
      this.displayAddHokenName = true;
    } else {
      // this.productsList.forEach((product) => {
      //   if (product.value === this.f.hokenName.value) {
      //     this.productName = product.label;
      //   }
      // });
      this.dataProductFiltered.forEach((product) => {
        if (product.productCd === this.f.hokenName.value) {
          this.productName = product.productName;
          this.listHosho = product.hoshoList.slice();
          this.listTokuyakuHosho = product.tokuyakuList.slice();
          // console.log('this.listHosho',  this.listHosho);
          this.initHosho();
        }
      });
    }
  }

  changeDataAfterAdd(event) {
    if (this.data.from === 'addKeiyakuSha') {
      if (event === null) {
        this.f.nameBook.setValue(null);
        this.display.status = false;
      } else {
        this.numberFamilyNew = this.numberFamilyNew + 1;
        this.familyList[this.familyList.length - 1] = { label: event, value: 'new' + this.numberFamilyNew };
        this.familyList.push({ label: 'その他', value: 'add' });
        this.f.nameBook.setValue('new' + this.numberFamilyNew);
        this.display.status = false;
      }
    }
    if (this.data.from === 'addProduct') {
      if (event === null) {
        this.f.hokenName.setValue(null);
        this.display.status = false;
      } else {
        this.productName = event;
        this.numberProductNew = this.numberProductNew + 1;
        this.productsList[this.productsList.length - 1] = { label: event, value: 'new' + this.numberProductNew  };
        this.productsList.push({ label: 'テキスト入力', value: 'add' });
        console.log('this.productsList', this.productsList);
        this.f.hokenName.setValue('new' + this.numberProductNew );
        console.log('this.productsList', this.f.hokenName.value);

        this.display.status = false;
      }
    }
  }

  chooseShukeiyaku() {
    this.resetPopUp();
    this.displayHoshoList = true;
  }

  addShukeiyaku(hosho) {
    this.resetPopUp();
    this.displayHoshoList = false;
    this.displayAddShukeiyaku = true;
    this.hoshoItem = new Hosho();
    if (hosho.hoshoNo !== 0) {
      this.hoshoNo = hosho.hoshoNo;
      this.seqNo = hosho.seqNo;
      this.hoshoName = hosho.hoshoName;
      this.hoshoValue = hosho.value ? hosho.value : '';
      this.comment = hosho.comment ? hosho.comment : '';
    } else {
      this.hoshoName = '';
      this.hoshoValue = '';
      this.comment = '';
    }
  }

  saveNewHosho() {
    if (this.hoshoNo !== 0) {
      this.listShukeiyaku.push({ keiyakuHoshoNo: null, keiyakuTokuyakuNo: 0, hoshoNo: this.hoshoNo, hoshoName: this.hoshoName,
        columnVal: this.hoshoValue, comment: this.comment,  seqNo: this.seqNo});
    } else {
      this.listShukeiyaku.push({ keiyakuHoshoNo: null, keiyakuTokuyakuNo: 0, hoshoNo: 0, hoshoName: this.hoshoName,
        columnVal: this.hoshoValue, comment: this.comment });
    }
    this.resetPopUp();
    this.displayAddShukeiyaku = false;
  }

  chooseTokuyaku() {
    this.resetPopUp();
    this.displayTokuyakuList = true;
  }

  chooseTokuyakuHosho(tokuyaku) {
    if (tokuyaku.tokuyakuNo !== 0) {
      this.tokuyakuName = tokuyaku.tokuyakuName;
      this.tokuyakuNo = tokuyaku.tokuyakuNo;
      this.tokuyakuSelNo = tokuyaku.seqNo;
    } else {
      this.tokuyakuName = '';
    }
    this.resetPopUp();
    this.displayTokuyakuList = false;
    this.displayTokuyakuHoshoList = true;
  }

  addTokuyakuHosho(hosho) {
    this.resetPopUp();
    this.displayTokuyakuHoshoList = false;
    this.displayHoshoList = false;
    this.displayAddTokuyaku = true;
    this.hoshoItem = new Hosho();
    if (hosho.hoshoNo !== 0) {
      // this.hoshoNo = hosho.hoshoNo;
      // this.seqNo = hosho.seqNo;
      // this.hoshoName = hosho.hoshoName;
      // this.hoshoValue = hosho.hoshoNo;
      // this.comment = hosho.comment ? hosho.comment : '';
      this.tokuyakuHoshoName = hosho.hoshoName;
      this.tokuyakuHoshoNo = hosho.hoshoNo;
      this.tokuyakuHoshoValue = hosho.value ? hosho.value : '';
      this.tokuyakuHoshoComment = hosho.comment ? hosho.comment : '';
      this.tokuyakuHoshoSeqNo = hosho.seqNo;
    } else {
      this.tokuyakuHoshoName = '';
      this.tokuyakuHoshoValue = '';
      this.tokuyakuHoshoComment = '';
    }
  }

  saveNewTokuyaku() {
    const listHosho = [];
    listHosho.push({
      keiyakuHoshoNo: null, hoshoName: this.tokuyakuHoshoName, hoshoNo: this.hoshoNo, seqNo: this.seqNo,
      columnVal: this.tokuyakuHoshoValue, comment: this.tokuyakuHoshoComment
    });
    if (this.tokuyakuNo !== 0) {
      this.listTokuyaku.push({ keiyakuTokuyakuNo: this.tokuyakuNo , seqNo: this.tokuyakuSelNo,
        tokuyakuName: this.tokuyakuName, hoshoList: listHosho });
    } else {
      this.listTokuyaku.push({ keiyakuTokuyakuNo: 0, seqNo: this.tokuyakuSelNo,
        tokuyakuName: this.tokuyakuName, hoshoList: listHosho });
    }
    this.resetPopUp();
    this.displayAddTokuyaku = false;
    this.tokuyakuHoshoName = '';
    this.tokuyakuHoshoValue = '';
    this.tokuyakuHoshoComment = '';
  }

  chooseNewHoshoOfTokuyaku(i) {
    this.tokuyakuUpdate = i;
    this.resetPopUp();
    this.displayTokuyakuHoshoListAdd = true;
  }
  mapNewHoshoOfTokuyaku(hosho) {
    this.resetPopUp();
    this.displayMapNewHoshoOfTokuyaku = true;
    this.displayTokuyakuHoshoListAdd = false;
    if (hosho.hoshoNo !== 0) {
      this.tokuyakuHoshoName = hosho.hoshoName;
      this.tokuyakuHoshoNo = hosho.hoshoNo;
      this.tokuyakuHoshoValue = hosho.value ? hosho.value : '';
      this.tokuyakuHoshoComment = hosho.comment ? hosho.comment : '';
      this.tokuyakuHoshoSeqNo = hosho.seqNo;
    } else {
      this.tokuyakuHoshoName = '';
      this.tokuyakuHoshoValue = '';
      this.tokuyakuHoshoComment = '';
    }
  }

  addNewHoshoToTokuyaku() {
    this.resetPopUp();
    this.displayMapNewHoshoOfTokuyaku = false;
    this.listTokuyaku[this.tokuyakuUpdate].hoshoList.push({
      keiyakuHoshoNo: null, hoshoName: this.tokuyakuHoshoName, hoshoNo: this.tokuyakuHoshoNo,
      columnVal: this.tokuyakuHoshoValue, comment: this.tokuyakuHoshoComment
    });
    // console.log(this.listTokuyaku);
    this.tokuyakuHoshoName = '';
    this.tokuyakuHoshoValue = '';
    this.tokuyakuHoshoComment = '';
  }

  deleteHoshoOfTokuyaku(i, i2) {
    this.confirmationService.confirm({
      message: '本当に削除してもよろしいでしょうか？',
      accept: () => {
        this.listTokuyaku[i].hoshoList.splice(i2, 1);
      }
    });
  }

  updateHoshoOfTokuyaku(i, i2) {
    this.currentUpdateTokuyaku = i;
    this.currentupdateHoshoTokuyaku = i2;
    this.resetPopUp();
    this.displayUpdateHoshoOfTokuyaku = true;
    this.tokuyakuHoshoName = this.listTokuyaku[i].hoshoList[i2].hoshoName;
    this.tokuyakuHoshoValue = this.listTokuyaku[i].hoshoList[i2].columnVal;
    this.tokuyakuHoshoComment = this.listTokuyaku[i].hoshoList[i2].comment;
  }

  saveUpdateHoshoToTokuyaku() {
    this.listTokuyaku[this.currentUpdateTokuyaku].hoshoList[this.currentupdateHoshoTokuyaku].hoshoName = this.tokuyakuHoshoName;
    this.listTokuyaku[this.currentUpdateTokuyaku].hoshoList[this.currentupdateHoshoTokuyaku].columnVal = this.tokuyakuHoshoValue;
    this.listTokuyaku[this.currentUpdateTokuyaku].hoshoList[this.currentupdateHoshoTokuyaku].comment = this.tokuyakuHoshoComment;
    this.resetPopUp();
    this.displayUpdateHoshoOfTokuyaku = false;
  }

  deleteTokuyaku(i) {
    this.confirmationService.confirm({
      message: '本当に削除してもよろしいでしょうか？',
      accept: () => {
        this.listTokuyaku.splice(i, 1);
      }
    });
  }

  editNameTokuyaku(i) {
    this.currentUpdateTokuyaku = i;
    this.tokuyakuNameEdit = this.listTokuyaku[this.currentUpdateTokuyaku].tokuyakuName;
    this.resetPopUp();
    this.displayEditTokuyakuName = true;
  }

  saveUpdateTokuyakuName() {
    this.resetPopUp();
    this.displayEditTokuyakuName = false;
    this.listTokuyaku[this.currentUpdateTokuyaku].tokuyakuName = this.tokuyakuNameEdit;
    this.tokuyakuNameEdit = '';
  }

  deleteShuleiyaku(i) {
    this.confirmationService.confirm({
      message: '本当に削除してもよろしいでしょうか？',
      accept: () => {
        this.listShukeiyaku.splice(i, 1);
      }
    });
  }
  updateShuKeiyaku(i) {
    this.resetPopUp();
    this.displayUpdateShukeiyaku = true;
    this.currentUpdateShukeiyaku = i;
    this.hoshoName = this.listShukeiyaku[i].hoshoName;
    this.hoshoValue = this.listShukeiyaku[i].columnVal;
    this.comment = this.listShukeiyaku[i].comment;
  }


  keyupPopup(value) {
    if (value === 'hoshoName') {
      if (this.hoshoName.length > 50 || this.hoshoName.length === 0) {
        this.isErrorHoshoName = true;
      } else {
        this.isErrorHoshoName = false;
      }
    }

    if (value === 'tokuyakuName') {
      if (this.tokuyakuName.length > 40 || this.tokuyakuName.length === 0) {
        this.isErrorTokuyakuName = true;
      } else {
        this.isErrorTokuyakuName = false;
      }
    }
    if (value === 'tokuyakuHoshoName') {
      if (this.tokuyakuHoshoName.length > 50 || this.tokuyakuHoshoName.length === 0) {
        this.isErrorTokuyakuHoshoName = true;
      } else {
        this.isErrorTokuyakuHoshoName = false;
      }
    }
    if (value === 'tokuyakuNameEdit') {
      if (this.tokuyakuNameEdit.length > 40 || this.tokuyakuHoshoName.length === 0) {
        this.isErrorTokuyakuNameEdit = true;
      } else {
        this.isErrorTokuyakuNameEdit = false;
      }
    }
  }

  saveUpdateHosho() {
    this.listShukeiyaku[this.currentUpdateShukeiyaku].hoshoName = this.hoshoName;
    this.listShukeiyaku[this.currentUpdateShukeiyaku].columnVal = this.hoshoValue;
    this.listShukeiyaku[this.currentUpdateShukeiyaku].comment = this.comment;
    this.displayUpdateShukeiyaku = false;
  }

  resetPopUp() {
    this.displayAddShukeiyaku = false;
    this.displayAddTokuyaku = false;
    this.displayHoshoList = false;
    this.displayTokuyakuList = false;
    this.displayTokuyakuHoshoList = false;
    this.displayTokuyakuHoshoListAdd = false;
    this.displayMapNewHoshoOfTokuyaku = false;
    this.displayUpdateHoshoOfTokuyaku = false;
    this.displayUpdateShukeiyaku = false;
    this.displayEditTokuyakuName = false;
    this.isErrorHoshoName = false;
    this.isErrorTokuyakuName = false;
    this.isErrorTokuyakuHoshoName = false;
    this.isErrorTokuyakuNameEdit = false;
  }


  mapDataProductToSave() {
    const controls = this.productForm.controls;
    if (this.agentForm.controls.agent.value === 'new') {
      this.dataAgent = {
        agentNo: null,
        agentName: this.agentForm.controls.nameAgent.value,
        phone: this.agentForm.controls.phoneAgent.value,
        tantoName: this.agentForm.controls.nameTanto.value,
        url: this.agentForm.controls.URL.value,
      };
    }
    this.productsList.forEach((product) => {
      if (product.value === this.f.hokenName.value) {
        this.productName = product.label;
      }
    });
    this.bodyValue = {
      token: localStorage.getItem('jwtToken'),
      saveKeiyakuInfo: {
        keiyakuNo: this.id === 0 ? null : this.id,
        myPageNo: this.myPageUserInfo.myPageNo,
        keiyakuFamilyNo: null,
        keiyakuFamilyName: '',
        hihoFamilyNo: this.hihoFamilyNo,
        hihoFamilyName: this.hihoFamilyName,
        companyCd: controls.company.value,
        hoshoCategoryF: controls.hokenCategoryType.value !== null ? (controls.hokenCategoryType.value).toString() : '',
        productName: this.productName,
        productCd: controls.hokenName.value.includes('new') ? '99999' : controls.hokenName.value,
        policyNo: parseFloat(controls.stockNumber.value),
        status: controls.statusBook.value !== null ? (controls.statusBook.value).toString() : '',
        contractDate: null,
        hokenEndDate: controls.yearEndDate.value ?
        controls.yearEndDate.value + controls.monthEndDate.value + controls.dayEndDate.value : null,
        hKikanF: controls.hokenkikan2.value,
        hkikan: controls.hokenkikan1.value,
        pKikanF: controls.haraiKikan2.value,
        pkikan: controls.haraiKikan1.value,
        haraikata: controls.haraikata.value,
        hokenP: controls.currency1.value ? parseFloat(controls.currency1.value) : null,
        currencyF: controls.currency2.value,
        updateCount: this.id === 0 ? '' : this.updateCount,
        hoshoList: this.listShukeiyaku,
        tokuyakuList: this.listTokuyaku,
        AgentInfo: this.dataAgent,
      }
    };
    if (this.isShowDate) {
      if (controls.yearStartDate.value) {
        this.bodyValue.saveKeiyakuInfo.contractDate = controls.yearStartDate.value +
        controls.monthStartDate.value + controls.dayStartDate.value;
      } else {
        this.bodyValue.saveKeiyakuInfo.contractDate = null;
      }
    } else {
      if (controls.yearDate.value) {
        this.bodyValue.saveKeiyakuInfo.contractDate = controls.yearDate.value + controls.monthDate.value + controls.dayDate.value;
      } else {
        this.bodyValue.saveKeiyakuInfo.contractDate = null;
      }
    }
    this.familyList.forEach((family) => {
      if (family.value === controls.nameBook.value) {
        this.bodyValue.saveKeiyakuInfo.keiyakuFamilyName = family.label;
        if (family.value && family.value.toString().includes('new')) {
          this.bodyValue.saveKeiyakuInfo.keiyakuFamilyNo = null;
        } else {
          this.bodyValue.saveKeiyakuInfo.keiyakuFamilyNo = family.value;
        }
      }
    });
  }

  saveProduct() {
    this.mapDataProductToSave();
    this.baseService.post(this.API_URLS.saveProduct, this.bodyValue).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.router.navigate(['product-confirm/' + res.keiyakuInfo.keiyakuNo]);
      } else if ((res.errorList && res.errorList.length > 0)) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }

    });
  }

  convertDate(data) {
    if (data === 'date') {
      this.date = moment(this.f.date.value).format('YYYYMMDD');
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
