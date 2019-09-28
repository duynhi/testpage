import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as $ from 'jquery';
import { MessageService } from 'primeng/components/common/messageservice';
import { ImgHD } from 'src/app/model/camera';
import { FormBuilder, Validators } from '@angular/forms';
declare var Webcam;
let cameraWidth;
let cameraHeight;

@Component({
  selector: 'app-start-cam',
  templateUrl: './start-cam.component.html',
  styleUrls: ['./start-cam.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StartCamComponent implements OnInit, OnDestroy {
  myPageUserInf: any;
  companys: SelectItem[] = [];
  listImage = [];
  isMobile = false;
  isTablet = false;
  loading = false;
  isSwitch = 'false';
  imgHD = new ImgHD();
  indexSwitch = -1;
  lastData: any;
  selectItemInfo: any;
  hadImage = false;
  errorCam: string;
  widthBody: number;
  heightBody: number;
  selectedCompany: any;
  cameraForm: any;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private deviceService: DeviceDetectorService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.initForm();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.listImage = JSON.parse(localStorage.getItem('list-image')) || [];
    if (localStorage.getItem('isSwitch')) {
      this.isSwitch = localStorage.getItem('isSwitch').split(' ')[0];
      this.indexSwitch = parseInt(localStorage.getItem('isSwitch').split(' ')[1], 10);
    }
    this.myPageUserInf = JSON.parse(localStorage.getItem('myPageUserInfo'));
    this.selectItemInfo = JSON.parse(localStorage.getItem('SelectItemInfo'));
    this.companys.push({label: '以下からご選択ください。', value: 0});
    this.selectItemInfo.companyfSelectList.forEach(company => {
      this.companys.push({label: company.companyName, value: company.companyCd});
    });
    this.selectedCompany = this.companys[0].value;
  }

  initForm() {
    this.cameraForm = this.formBuilder.group({
      company: [''],
    });
  }

  changeCompany() {
    // this.cameraForm.controls.company.value
  }

  goToCamera() {
    if (!this.isMobile && !this.isTablet) {
      this.checkCamPC();
      // this.router.navigate(['camera']);
    } else {
      $('#fileinput').click();
    }
  }

  handleClick(event) {
    this.hadImage = true;
    this.loading = true;
    this.getBase64(event.target.files[0]);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =  () => {
      this.lastData = reader.result;
      if (this.isSwitch === 'false') {
        this.listImage.push(reader.result);
      } else {
        this.listImage[this.indexSwitch] = reader.result;
      }
      localStorage.setItem('list-image', JSON.stringify(this.listImage));
      setTimeout(() => {
        this.loading = false;
        this.hadImage = false;
        this.router.navigate(['/image-confirm']);
      }, 2000);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
 }

 checkCamPC() {
  this.widthBody = window.innerWidth / 2;
  if (window.innerWidth <= 400) {
    this.widthBody = window.innerWidth - window.innerWidth * 0.1;
  } else {
    this.widthBody = 400;
  }
  this.heightBody = this.widthBody * this.imgHD.ratio;
  cameraWidth = this.widthBody;
  cameraHeight = this.heightBody;
  Webcam.set({
    width: cameraWidth,
    height: cameraHeight,
    image_format: 'jpeg',
    jpeg_quality: 100,
    // constraints: {
    //   width: { exact: this.widthBody },
    //   height: { exact: this.heightBody },
    // },
  });
  Webcam.attach('#my_camera');
  Webcam.on( 'error', (err) => {
    switch (err.message) {
      case 'Permission denied':
        this.errorCam = 'カメラの使用許可がありません。ブラウザのカメラ権限を有効にしてください。';  
        break;
      case 'Requested device not found':
      case 'Starting video failed':
        this.errorCam = '端末のカメラがありません。';  
        break;
      case 'No supported webcam interface found.':
        this.errorCam = '端末のカメラがありません。';
        break;
      case 'The object can not be found here.':
          this.errorCam = '端末のカメラがありません。';
          break;
      case 'Constraints could be not satisfied.':
          this.errorCam = 'カメラ許可がない!ブラウザのカメラを有限にしてください。';
          break;
      default:
        this.errorCam = err.message;
        break;
    }
    this.showMessage(this.errorCam);
  });

  Webcam.on( 'live', () => {
    this.router.navigate(['camera']);
  } );
 }

 showMessage(data) {
  this.messageService.clear();
  this.messageService.add({severity: 'error', summary: 'エラー内容', detail: data});
 }

 get f() { return this.cameraForm.controls; }

 goToProduct() {
   if (this.cameraForm.controls.company.value) {
     localStorage.setItem('company-start', this.cameraForm.controls.company.value.toString());
   } else {
    localStorage.setItem('company-start', null);
   }
   this.router.navigate(['product-change/0']);
 }

 ngOnDestroy() {
  Webcam.reset();
}

}
