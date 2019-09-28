import { Component, OnInit } from '@angular/core';
import { API_URLS } from 'src/app/utils/common-constant';
import { BaseService } from 'src/app/service/common.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpResponse } from '@angular/common/http';
// import { InfiniteScroll } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  // directives: [InfiniteScroll],
})
export class DocumentListComponent implements OnInit {
  API_URLS = API_URLS;
  myPageUserInfo: any;
  endItemNumber = 0;
  listPdf = [];
  listTypeFile = [];
  showLoading = false;
  selectItemInfo: any;
  abc: any;
  constructor(private baseService: BaseService,
              public messageService: MessageService) {  }

  ngOnInit() {
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    this.selectItemInfo = JSON.parse(localStorage.getItem('SelectItemInfo'));
    this.listTypeFile = this.selectItemInfo.pdfTypeSelectList;
    this.getListPdf();
  }

  mapLabel(listData) {
    listData.forEach(data => {
      data.visitDate = moment(data.visitDate, 'YYYYMMDD').format('YYYY/MM/DD');
      this.listTypeFile.forEach((fileType) => {
        if (fileType.selNo.toString() === data.fileType.toString()) {
          data.fileType = fileType.name;
        }
      });
      this.myPageUserInfo.familyList.forEach((family) => {
        if (family.familyNo.toString() === data.hihoFamilyNo.toString()) {
          data.hihoFamilyNo = family.lastName + '  ' + family.firstName;
        }
      });
    });
  }


  getListPdf() {
    if (!this.showLoading && this.listPdf.length % 10 === 0) {
      this.showLoading = true;
      const value = {
        token: localStorage.getItem('jwtToken'),
        pdfInfo: {
          myPageNo: this.myPageUserInfo.myPageNo,
          agentCd: localStorage.getItem('agentCd'),
          offset: this.listPdf.length,
        }
      };
      this.baseService.post(this.API_URLS.getListPdf, value).subscribe(res => {
        if (res.pdfInfo) {
          // res.pdfInfo.push(this.abc);
          this.mapLabel(res.pdfInfo);
          this.showLoading = false;
          res.pdfInfo.forEach((pdf) => {
            this.listPdf.push(pdf);
          });
        } else {
          if (res.errorList && res.errorList.length > 0) {
            res.errorList.forEach(error => {
              this.showError(error.errMessage);
            });
          }
        }
      });
    }
  }

  downloadPdf(fileNo) {
    const value = {
      token: localStorage.getItem('jwtToken'),
      pdfInfo: {
        myPageNo: this.myPageUserInfo.myPageNo,
        agentCd: localStorage.getItem('agentCd'),
        pdfFileNo: fileNo,
      }
    };
    this.baseService.downloadExcel(this.API_URLS.downPdf, value).subscribe(
      (res: HttpResponse<any>) => {
        const contentDisposition = res.headers.get('content-disposition');
        const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        const filenameTmp = filename.replace(/\"/gi, '');
        this.downLoadFile(res.body, 'application/pdf', decodeURIComponent(escape(filenameTmp)));
        // if (fileName.includes('pdf')) {
        // this.downLoadFile(res.body, 'application/pdf', filename);
        // } else {
        //   this.downLoadFile(res.body, 'application/image', fileName);
        // }
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

  // downloadPdf(fileNo) {
  //   const value = {
  //     token: localStorage.getItem('jwtToken'),
  //     pdfInfo: {
  //       myPageNo: this.myPageUserInfo.myPageNo,
  //       agentCd: localStorage.getItem('agentCd'),
  //       pdfFileNo: fileNo,
  //     }
  //   };
  //   this.baseService.post(this.API_URLS.downPdf, value).subscribe(res => {
  //     if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
  //     } else if (res.errorList && res.errorList.length > 0) {
  //       res.errorList.forEach(error => {
  //         this.showError(error.errMessage);
  //       });
  //     }
  //   });
  // }

  showError(message) {
    this.messageService.add({severity: 'error', detail: message});
  }

}
