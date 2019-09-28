import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-password-update-success',
  templateUrl: './customer-password-update-success.component.html',
  styleUrls: ['./customer-password-update-success.component.scss']
})
export class CustomerPasswordUpdateSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTopPage() {
    this.router.navigate(['/top-menu']);
  }

}
