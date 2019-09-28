import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';
import { Helper } from 'src/app/utils/common-function';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent implements OnInit {

// ReservationList
// OWL CAROUSEL CONFIG
  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    nav: false,
    responsive: {
      640: {
        items: 3
      },
      768: {
        items: 4
      },
      1024: {
        items: 7
      },
      1280: {
        items: 9
      },
      1366: {
        items: 10
      },
      1600: {
        items: 13
      },
    },
    autoWidth: true
  };

  // dummy data
  datas = [{image: './assets/image/contract_family_face.png', name: '太郎'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'},
          {image: './assets/image/contract_family_face.png', name: '花子'}];
  // ReservationList

  // CameraImageConfirm
  // OWL CAROUSEL CONFIG
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

  // dummy data for slide
  imgDatas = [{image: './assets/image/ocr-confirm.png'},
          {image: './assets/image/ocr-confirm.png'},
          {image: './assets/image/ocr-confirm.png'},
          {image: './assets/image/ocr-confirm.png'},
          {image: './assets/image/ocr-confirm.png'}];

  defaultIndex = 0;
  FirstItem = false;
  LastItem = true;

  getPassedData(i) {
    // check Show Hide next, prev button
    this.FirstItem = i.startPosition > this.defaultIndex ? true : false;
    // tslint:disable-next-line: triple-equals
    this.LastItem = i.startPosition == this.imgDatas.length - 1 ? false : true;
  }
  constructor() { }

  ngOnInit() {
  }

}
