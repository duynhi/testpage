import { Component, OnInit } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faPhone = faPhone;
  constructor() { }

  ngOnInit() {
  }

  goToClinic() {
    window.open('https://www.hoken-clinic.com/list/');
  }

}
