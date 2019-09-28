import { Component, OnInit, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ImgHD } from 'src/app/model/camera';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as $ from 'jquery';
declare var Webcam;
let cameraIndex = 0;
let cameraWidth;
let cameraHeight;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {
  heightBody: number;
  widthBody: number;
  options: any;
  onSuccess: any;
  onError: any;
  lastData: any;
  listImage = [];
  cameras = [];
  numberImage: number;
  isCapturingImage: boolean;
  imgHD = new ImgHD();
  multiCam = false;
  lastInitIndex: number;
  isSwitch = 'false';
  indexSwitch = -1;
  isMobile = false;
  isTablet = false;
  loading = false;
  constructor(private router: Router, private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    cameraIndex = 0;
    Webcam.reset();
    this.isCapturingImage = false;
    this.SetCamera();
    this.listImage = JSON.parse(localStorage.getItem('list-image')) || [];
    if (localStorage.getItem('isSwitch')) {
      this.isSwitch = localStorage.getItem('isSwitch').split(' ')[0];
      this.indexSwitch = parseInt(localStorage.getItem('isSwitch').split(' ')[1], 10);
    }
  }

  // ngAfterViewInit() {
  //   if (!this.isMobile && !this.isTablet) {
  //     this.SetCamera();
  //   }
  //   if (this.isMobile || this.isTablet) {
  //     $('#fileinput').click();
  //   }

  // }

  checkCamNumber() {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        // Get all cameras on the device
        this.cameras = devices.filter((device) => {
          return device.kind === 'videoinput';
        });
        if (this.cameras.length > 1) {
          this.multiCam = true;
          cameraIndex = 1;
        } else {
          this.multiCam = false;
        }
      });
  }

  SetCamera() {
    this.widthBody = window.innerWidth / 2;
    if (window.innerWidth <= 400) {
      this.widthBody = window.innerWidth - window.innerWidth * 0.1;
    } else {
      this.widthBody = 400;
    }
    this.heightBody = this.widthBody * this.imgHD.ratio;
    cameraWidth = this.widthBody;
    cameraHeight = this.widthBody;
    Webcam.reset();
    Webcam.set({
      width: 400,
      height: 400,
      image_format: 'jpeg',
      jpeg_quality: 100,
      // constraints: {
      //   width: { exact: 300 },
      //   height: { exact: 500 },
      // },
      // flip_horiz: true,
      // force_flash: true,
    });
    Webcam.attach('#my_camera');
    // navigator.mediaDevices.enumerateDevices()
    //   .then(function (devices) {
    //     // Get all cameras on the device
    //     var cameras = devices.filter(function (device) {
    //       return device.kind === 'videoinput';
    //     });

    //     if (cameras.length > 1) {
    //       cameraIndex = 1;
    //     } else {
    //       cameraIndex = 0;
    //     }

    //     Webcam.set({
    //       width: cameraWidth,
    //       height: cameraHeight,
    //       dest_width: 1920,
    //       dest_height: 1080,
    //       image_format: 'jpeg',
    //       jpeg_quality: 100,
    //       constraints: {
    //         width: { exact: 1920 },
    //         height: { exact: 1080 },
    //         deviceId: {
    //           exact: cameras[cameraIndex].deviceId
    //         },
    //         facingMode: 'environment'
    //       }
    //     });

    //     Webcam.attach('#my_camera');
    //   });
  }
  
  ChangeCamera() {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        // Get all cameras on the device
        const cameras = devices.filter((device) => {
          return device.kind === 'videoinput';
        });

        if (cameras.length > 1) {
          cameraIndex = cameraIndex === 0 ? 1 : 0;
        } else {
          return;
        }

        Webcam.set({
          width: cameraWidth,
          height: cameraHeight,
          // dest_width: 1920,
          // dest_height: 1080,
          image_format: 'jpeg',
          jpeg_quality: 100,
          constraints: {
            // width: { exact: 1920 },
            // height: { exact: 1080 },
            deviceId: {
              exact: cameras[cameraIndex].deviceId
            },
            facingMode: 'environment'
          }
        });

        Webcam.reset();
        Webcam.attach('#my_camera');
      });

  }

  take_snapshot() {
    this.isCapturingImage = true;
    // const audio = new Audio('assets/sound/camera-shutter.mp3');
    // audio.play();
    setTimeout(() => {
      let dataBase64;
      Webcam.snap((dataUri) => {
        dataBase64 = dataUri;
      });
      this.lastData = dataBase64;
      if (this.isSwitch === 'false') {
        this.listImage.push(dataBase64);
      } else {
        this.listImage[this.indexSwitch] = dataBase64;
      }
      this.numberImage = this.listImage.length;
      this.isCapturingImage = false;
      localStorage.setItem('list-image', JSON.stringify(this.listImage));
      this.router.navigate(['/image-confirm']);
    }, 300);

  }

  ngOnDestroy() {
    Webcam.reset();
    localStorage.setItem('isSwitch', 'false 0');
  }
}
