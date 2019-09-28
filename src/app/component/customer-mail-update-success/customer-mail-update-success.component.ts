import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-mail-update-success',
  templateUrl: './customer-mail-update-success.component.html',
  styleUrls: ['./customer-mail-update-success.component.scss']
})
export class CustomerMailUpdateSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTop() {
    this.router.navigate(['/top-menu']);
  }

}
