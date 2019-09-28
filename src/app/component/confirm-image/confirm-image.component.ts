import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as $ from 'jquery';

@Component({
  selector: 'app-confirm-image',
  templateUrl: './confirm-image.component.html',
  styleUrls: ['./confirm-image.component.scss']
})
export class ConfirmImageComponent implements OnInit {

  imageConfirmOption: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    nav: false,
    responsive: {
      0: {
        items: 1
      }
    },
    autoWidth: true
  };

  currentIndex = 0;
  imgDatas = JSON.parse(localStorage.getItem('list-image')) || [];
  defaultIndex = 0;
  FirstItem = false;
  LastItem = true;
  isMobile = false;
  isTablet = false;
  lastData: any;
  isSwitch = false;
  indexSwitch = 0;
  hadImage = false;
  loading = false;
  constructor(private router: Router, private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
  }

  getPassedData(i) {
    this.FirstItem = i.startPosition > this.defaultIndex ? true : false;
    this.LastItem = i.startPosition === this.imgDatas.length - 1 ? false : true;
    this.currentIndex = i.startPosition;
  }
  moreImage() {
    if (!this.isMobile && !this.isTablet) {
      localStorage.setItem('isSwitch', 'false 0');
      this.router.navigate(['/camera']);
    } else {
      this.isSwitch = false;
      $('#fileinput').val('');
      $('#fileinput').click();
    }
  }
  changeImage() {
    if (!this.isMobile && !this.isTablet) {
      localStorage.setItem('isSwitch', 'true ' + this.currentIndex);
      this.router.navigate(['/camera']);
    } else {
      this.isSwitch = true;
      $('#fileinput').val('');
      $('#fileinput').click();
    }
  }

  handleClick(event) {
    this.loading = true;
    this.hadImage = true;
    this.getBase64(event.target.files[0]);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =  () => {
      this.lastData = reader.result;
      if (!this.isSwitch) {
        this.imgDatas.push(reader.result);
      } else {
        this.imgDatas[this.indexSwitch] = reader.result;
      }
      // this.numberImage = this.listImage.length;
      // this.isCapturingImage = false;
      localStorage.setItem('list-image', JSON.stringify(this.imgDatas));
      // this.loading = false;
      // this.router.navigate(['/image-confirm']);
      setTimeout(() => {
        this.loading = false;
        this.hadImage = false;
      }, 2000);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
 }

}
