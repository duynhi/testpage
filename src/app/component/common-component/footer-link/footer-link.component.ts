import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer-link',
  templateUrl: './footer-link.component.html',
  styleUrls: ['./footer-link.component.scss'],
})
export class FooterLinkComponent implements OnInit, AfterContentChecked{
  faAngleRight = faAngleRight;
  position = 'SP';//set breadCrumb position
  footerCustom = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(){
    if(window.location.href.includes('/login')){
      this.footerCustom = false;
    }else{
      this.footerCustom = window.innerHeight > document.querySelector('body').offsetHeight;
    }
  }

  onResize(event) {
    if(window.location.href.includes('/login')){
      this.footerCustom = false;
    }else{
      this.footerCustom = window.innerHeight > document.querySelector('body').offsetHeight;
    }
  }
}
