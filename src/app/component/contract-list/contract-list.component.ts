import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS, HARAIKATA } from 'src/app/utils/common-constant';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { faAngleRight, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
// import { SwiperComponent } from 'angular2-useful-swiper';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss'],
  providers: [ConfirmationService]
})
export class ContractListComponent implements OnInit {
  msgs: any;
  currentSelect = 0;
  myPageUserInf: any;
  dataSlider = [];
  API_URLS = API_URLS;
  HARAIKATA = HARAIKATA;
  currentFamily: number;
  totalMoney: any;
  loading = false;
  keiyakuList = [];
  listErrors: any;
  name: string;
  // lastIndex = 3;
  lastIndex = 0;
  selectItemInfo: any;
  faChevronCircleRight = faChevronCircleRight;
  faChevronCircleLeft = faChevronCircleLeft;
  swiper: any;
  activeSlides: SlidesOutputData;
  slideOption: any = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    responsive: {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      nav: false,
      responsive: {
        640: {
          items: 2
        },
        768: {
          items: 2
        },
        1024: {
          items: 2
        },
        1280: {
          items: 2
        },
        1366: {
          items: 2
        },
        1600: {
          items: 2
        },
      },
      // autoWidth: true
    },
    // autoWidth: true,
    nav: true
  };
  // @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
  // @ViewChild('usefulSwiper2') usefulSwiper2: SwiperComponent;
  constructor(private router: Router,
              private baseService: BaseService,
              public messageService: MessageService,
              private confirmationService: ConfirmationService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.myPageUserInf = JSON.parse(localStorage.getItem('myPageUserInfo'));
    this.selectItemInfo = JSON.parse(localStorage.getItem('SelectItemInfo'));
    const agentCd = localStorage.getItem('agentCd');
    if (!agentCd) {
      this.router.navigate(['/choose-agent']);
    } else {
      this.myPageUserInf.familyList.forEach((family) => {
        if (family.agentCd === agentCd) {
          this.dataSlider.push(family);
        }
      });
      // this.dataSlider = this.myPageUserInf.familyList;
      // this.dataSlider.forEach((person) => {
      //   if (person.relation === '0') {
      this.currentFamily = this.dataSlider[0].familyNo;
      localStorage.setItem('hihoFamily', this.currentFamily.toString());
      this.name = this.dataSlider[0].lastName + ' ' + this.dataSlider[0].firstName;
      localStorage.setItem('hihoFamilyName', this.name);
      // }
      // });
    }
    this.getListKeiyaku();
  }

  // ngAfterViewInit() {
  //   this.activeSlides.startPosition = 0;
  // }
  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  showError(message) {
    this.messageService.add({ severity: 'error', detail: message });
  }

  mapDataListKeiyaku() {
    this.keiyakuList.forEach((keiyaku) => {
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
      console.log(this.selectItemInfo.currencySelectList);
      this.selectItemInfo.currencySelectList.forEach((currency) => {
        if (keiyaku.currencyF && keiyaku.currencyF.toString() === currency.selNo.toString()) {
          keiyaku.currencyF = currency.name;
        }
      });
      // this.selectItemInfo.hoshoCategorySelectList.forEach((category) => {
      //   if (keiyaku.hoshoCategoryF && keiyaku.hoshoCategoryF.toString() === category.selNo.toString()) {
      //     keiyaku.hoshoCategoryF = category.name;
      //   }
      // });
    });
  }

  getListKeiyaku() {
    // this.loading = true;
    const value = {
      token: localStorage.getItem('jwtToken'),
      listKeiyakuInfo: {
        myPageNo: this.myPageUserInf.myPageNo,
        hihoFamilyNo: this.currentFamily
      }
    };
    this.baseService.post(this.API_URLS.getListKeiyaku, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.totalMoney = res.hokenPInfo;
        res.keiyakuList.sort((a, b) => {
          return parseInt(a.status, 10) - parseInt(b.status, 10);
        });
        this.keiyakuList = res.keiyakuList.slice();
        // console.log('this.keiyakuList', res.keiyakuList);
        this.mapDataListKeiyaku();
      }
      if (res.errorList && res.errorList.length > 0) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
      this.loading = false;
    });
  }

  goToCamera() {
    localStorage.setItem('isSwitch', 'false 0');
    this.router.navigate(['/start-cam']);
  }

  goToProductConfirm(id) {
    this.router.navigate(['/product-confirm/' + id]);
  }

  showKeiyaku(i) {
    if (this.currentSelect !== i) {
      this.currentSelect = i;
      this.currentFamily = this.dataSlider[i].familyNo;
      localStorage.setItem('hihoFamily', this.currentFamily.toString());
      localStorage.setItem('hihoFamilyName', this.dataSlider[i].lastName + ' ' + this.dataSlider[i].firstName);
      this.name = this.dataSlider[i].lastName + ' ' + this.dataSlider[i].firstName;
      this.getListKeiyaku();
    }
  }



  confirm(i) {
    this.confirmationService.confirm({
      message: '契約を削除します。よろしいでしょうか？',
      header: '削除確認',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true;
        const value = {
          token: localStorage.getItem('jwtToken'),
          keiyakuInfo: {
            hihoFamilyNo: this.currentFamily,
            keiyakuNo: this.keiyakuList[i].keiyakuNo,
            myPageNo: this.myPageUserInf.myPageNo,
            updateCount: this.keiyakuList[i].updateCount,
          }
        };
        this.baseService.post(this.API_URLS.deleteKeiyaku, value).subscribe(res => {
          this.loading = false;
          if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
            this.messageService.add({ severity: 'success', summary: '終了', detail: '削除しました' });
            this.totalMoney = res.hokenPInfo;
            this.keiyakuList = res.keiyakuList;
            this.mapDataListKeiyaku();
          } else if ((res.errorList && res.errorList.length > 0)) {
            res.errorList.forEach(error => {
              this.showError(error.errMessage);
            });
          }
        });
      },
    });
  }


}
