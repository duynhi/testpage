import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-setting',
  templateUrl: './customer-setting.component.html',
  styleUrls: ['./customer-setting.component.scss']
})
export class CustomerSettingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLink(data) {
    if (data === 'customerList') {
      this.router.navigate(['/customer-list']);
    } else if (data === 'agencyList') {
      this.router.navigate(['/agency-list']);
    } else if (data === 'passUpdate') {
      this.router.navigate(['/customer-password-update']);
    } else {
      this.router.navigate(['/customer-mail-update']);
    }
  }

}
