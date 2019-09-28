import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS } from 'src/app/utils/common-constant';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { MessageService } from 'primeng/components/common/messageservice';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-product-confirm',
  templateUrl: './product-confirm.component.html',
  styleUrls: ['./product-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService],
})
export class ProductConfirmComponent implements OnInit, OnDestroy {
  API_URLS = API_URLS;
  sub: any;
  id: number;
  fileUrl;
  myPageUserInfo: any;
  dataProduct: any;
  companyName = '';
  curencyValue = '';
  hkikhanFValue = '';
  pkikanFValue = '';
  categoryValue = '';
  haraikataValue = '';
  statusValue = '';
  fileName = '';
  base64Data: any;
  selectItemInfo: any;
  isShowDate = false;

  constructor(private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private baseService: BaseService,
              private route: ActivatedRoute,
              public messageService: MessageService,
              private confirmationService: ConfirmationService) { }
  // OWL CAROUSEL CONFIG
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
  ngOnInit() {
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    this.selectItemInfo = JSON.parse(localStorage.getItem('SelectItemInfo'));
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
      this.getDataproduct();
    });
  }


  getDataproduct() {
    const value = {
      token: localStorage.getItem('jwtToken'),
      keiyakuInfo: {
        keiyakuNo: this.id,
        myPageNo: this.myPageUserInfo.myPageNo,
        hihoFamilyNo: parseInt(localStorage.getItem('hihoFamily'), 10)
      }
    };
    this.baseService.post(this.API_URLS.getProduct, value).subscribe(res => {
      if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
        this.dataProduct = res.keiyakuInfo;
        this.dataProduct.keiyakuFileList = this.dataProduct.keiyakuFileList.reverse();
        this.mapDataToView();
      } else if ((res.errorList && res.errorList.length > 0)) {
        res.errorList.forEach(error => {
          this.showError(error.errMessage);
        });
      }
    });
  }

  showError(message) {
    this.messageService.add({ severity: 'error', detail: message });
  }

  mapDataToView() {
    this.selectItemInfo.companyfSelectList.forEach(company => {
      if (this.dataProduct.companyCd !== null && (company.companyCd).toString() === (this.dataProduct.companyCd).toString()) {
        this.companyName = company.companyName;
      }
    });
    this.selectItemInfo.haraikataSelectList.forEach(harai => {
      if (this.dataProduct.haraikata !== null && (harai.selNo).toString() === (this.dataProduct.haraikata).toString()) {
        this.haraikataValue = harai.name;
      }
    });
    this.selectItemInfo.currencySelectList.forEach(currency => {
      if (this.dataProduct.currencyF !== null && (currency.selNo).toString() === (this.dataProduct.currencyF).toString()) {
        this.curencyValue = currency.name;
      }
    });
    this.selectItemInfo.kikanFStatusSelectList.forEach(kikan => {
      if (this.dataProduct.pkikanF !== null && (kikan.selNo).toString() === (this.dataProduct.pkikanF).toString()) {
        this.pkikanFValue = kikan.name;
      }
      if (this.dataProduct.hkikanF !== null && (kikan.selNo).toString() === (this.dataProduct.hkikanF).toString()) {
        this.hkikhanFValue = kikan.name;
      }
    });
    this.selectItemInfo.hoshoCategorySelectList.forEach(category => {
      if (this.dataProduct.hoshoCategoryF !== null && (category.selNo).toString() === (this.dataProduct.hoshoCategoryF).toString()) {
        this.categoryValue = category.name;
      }
    });
    if (parseInt(this.dataProduct.hoshoCategoryF, 10) > 3) {
      this.isShowDate = true;
    }
    this.selectItemInfo.haraikataSelectList.forEach(haraikata => {
      if (this.dataProduct.haraikata !== null && (haraikata.selNo).toString() === (this.dataProduct.haraikata).toString()) {
        this.haraikataValue = haraikata.name;
      }
    });
    this.selectItemInfo.keiyakuStatusSelectList.forEach(status => {
      if (this.dataProduct.status !== null && (status.selNo).toString() === (this.dataProduct.status).toString()) {
        this.statusValue = status.name;
      }
    });
    if (this.dataProduct.contractDate) {
      this.dataProduct.contractDate = moment(this.dataProduct.contractDate, 'YYYYMMDD').format('YYYY年MM月DD日');
    }
    if (this.dataProduct.hokenEndDate) {
      this.dataProduct.hokenEndDate = moment(this.dataProduct.hokenEndDate, 'YYYYMMDD').format('YYYY年MM月DD日');
    }
  }

  deleteFile(i) {
    // console.log('aaaaaaaaaa', i)
    const value = {
      token: localStorage.getItem('jwtToken'),
      keiyakuFileInfo: {
        keiyakuFileNo: this.dataProduct.keiyakuFileList[i].keiyakuFileNo,
        keiyakuNo: this.dataProduct.keiyakuNo
      }
    };
    this.confirmationService.confirm({
      message: '本当に削除してもよろしいでしょうか？',
      accept: () => {
        this.baseService.post(this.API_URLS.deleteFile, value).subscribe(res => {
          if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
            this.dataProduct.keiyakuFileList = res.keiyakuFileList.reverse().slice();
          } else if ((res.errorList && res.errorList.length > 0)) {
            res.errorList.forEach(error => {
              this.showError(error.errMessage);
            });
          }
        });
      }
    });
  }


  getFile(i, fileName) {
    const value = {
      token: localStorage.getItem('jwtToken'),
      keiyakuFileInfo: {
        keiyakuFileNo: this.dataProduct.keiyakuFileList[i].keiyakuFileNo,
        keiyakuNo: this.dataProduct.keiyakuNo
      }
    };
    this.baseService.downloadExcel(this.API_URLS.getFile, value).subscribe(
      (res: HttpResponse<any>) => {
        const contentDisposition = res.headers.get('content-disposition');
        // const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        // const filenameTmp = filename.replace(/\"/gi, '');
        if (fileName.includes('pdf')) {
          this.downLoadFile(res.body, 'application/pdf', fileName);
        } else {
          this.downLoadFile(res.body, 'application/image', fileName);
        }
        // const fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(res));
      },
      (errs) => {
        console.log(errs);
      }
    );
  }

  downLoadFile(blob: any, type: string, filename: string): string {
    const url = window.URL.createObjectURL(blob); // <-- work with blob directly

    // create hidden dom element (so it works in all browsers)
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    console.log('aaaaaaaaaa');
    // create file, attach to hidden element and open hidden element
    a.href = url;
    a.download = filename;
    a.click();
    return url;
  }

  // getFile(i, fileName) {
  //   const value = {
  //     token: localStorage.getItem('jwtToken'),
  //     keiyakuFileInfo: {
  //       keiyakuFileNo: this.dataProduct.keiyakuFileList[i].keiyakuFileNo,
  //       keiyakuNo: this.dataProduct.keiyakuNo
  //     }
  //   };
  //   this.downloadReport(this.API_URLS.getFile, value).subscribe(
  //     data => {
  //       const file = new Blob([data], {type: 'application/json'});
  //       // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
  //       // console.log(file);
  //       saveAs(data, fileName);
  //     },
  //     err => {
  //       alert('Problem while downloading the file.');
  //       console.error(err);
  //     }
  //   );
  // }

  downloadReport(url, value): Observable<any> {
    return this.http.post(url, value, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }



  addFile() {
    $('#inputFile').click();
  }

  handleClickAddFile(event) {
    this.fileName = event.target.files[0].name;
    this.getBase64(event.target.files[0]);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64Data = reader.result;
      const value = {
        token: localStorage.getItem('jwtToken'),
        keiyakuFileInfo: {
          keiyakuNo: this.dataProduct.keiyakuNo,
          fileName: this.fileName,
          dataUri: this.base64Data,
        }
      };
      this.baseService.post(this.API_URLS.addFile, value).subscribe(res => {
        if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
          this.dataProduct.keiyakuFileList = res.keiyakuFileList.reverse().slice();
        } else if ((res.errorList && res.errorList.length > 0)) {
          res.errorList.forEach(error => {
            this.showError(error.errMessage);
          });
        }
      });
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  backToStartCam() {
    if (this.id === 0) {
      this.router.navigate(['/start-cam']);
    } else {
      this.router.navigate(['/contract-list']);
    }
  }

  edit() {
    this.router.navigate(['product-change/' + this.id]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
