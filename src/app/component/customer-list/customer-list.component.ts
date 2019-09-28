import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BaseService } from 'src/app/service/common.service';
import { API_URLS } from 'src/app/utils/common-constant';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [ConfirmationService]
})
export class CustomerListComponent implements OnInit {
  myPageUserInfo: any;
  dataMain: any;
  selectItemInfo: any;
  listFamily = [];
  API_URLS = API_URLS;
  constructor(private baseService: BaseService,
              public messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit() {
    this.myPageUserInfo = JSON.parse(localStorage.getItem('myPageUserInfo'));
    this.selectItemInfo = JSON.parse(localStorage.getItem('SelectItemInfo'));
    this.convertData();
    this.pushPeron();
  }

  convertData() {
    this.myPageUserInfo.familyList.forEach((family) => {
      family.birthday = moment(family.birthday, 'YYYYMMDD').format('YYYY年MM月DD日');
      this.selectItemInfo.relationSelectList.forEach((realtion) => {
        if ((family.relation).toString() === (realtion.selNo).toString()) {
          family.relation = realtion.name;
        }
      });
      this.selectItemInfo.sexfSelectList.forEach((gender) => {
        if (family.sex === gender.reserve) {
          family.sex = gender.name;
        }
      });
    });
    
  }

  pushPeron() {
    this.myPageUserInfo.familyList.forEach(person => {
      if (person.relation === '本人') {
        this.dataMain = person;
      } else {
        this.listFamily.push(person);
      }
    });
  }

  deleteFamily(data, index) {
    this.confirmationService.confirm({
      message: this.listFamily[index].lastName + this.listFamily[index].firstName + 'を削除します。 よろしいでしょうか？',
      accept: () => {
        const value = {
          token: localStorage.getItem('jwtToken'),
          myPageUserInfo: {
            myPageNo: this.myPageUserInfo.myPageNo,
            familyInfo: {
              familyNo: data,
            }
          }
        };
        this.baseService.post(this.API_URLS.deleteFamily, value).subscribe(res => {
          if (res.errorList === null || (res.errorList && res.errorList.length === 0)) {
            this.messageService.add({severity: 'success', detail: '削除しました'});
            this.listFamily.splice(index, 1);
            console.log(this.listFamily);
            this.myPageUserInfo.familyList = [];
            this.myPageUserInfo.familyList.push(this.dataMain);
            // this.myPageUserInfo.familyList = this.listFamily.slice();
            this.listFamily.slice().forEach(family => {
              this.myPageUserInfo.familyList.push(family);
            })
            this.myPageUserInfo.familyList.forEach((family) => {
              this.selectItemInfo.relationSelectList.forEach((relation) => {
                if(family.relation === relation.name) {
                  console.log(relation);
                  family.relation = relation.selNo;
                }
              });
              this.selectItemInfo.sexfSelectList.forEach((gender) => {
                if(family.sex === gender.name) {
                  family.sex = gender.reserve;
                }
              })
              family.birthday = moment(family.birthday, 'YYYY年MM月DD日').format('YYYYMMDD');
            });
            localStorage.setItem('myPageUserInfo', JSON.stringify(this.myPageUserInfo));
            this.convertData();
          } else if ((res.errorList && res.errorList.length > 0)) {
            res.errorList.forEach(error => {
              this.showError(error.errMessage);
            });
          }
        });
      }
    });
  }

  addFamily(familyNo) {
    this.router.navigate(['/customer-info-family-update/' + familyNo ]);
  }

  showError(message) {
    this.messageService.add({severity: 'error', detail: message});
  }

  goToUpdateMain() {
    this.router.navigate(['/customer-info-update']);
  }
}
