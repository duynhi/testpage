import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-insurance-procedure-regist-success',
  templateUrl: './insurance-procedure-regist-success.component.html',
  styleUrls: ['./insurance-procedure-regist-success.component.scss']
})
export class InsuranceProcedureRegistSuccessComponent implements OnInit {
  sub: any;
  id: number;
  tantoData: any;
  myPageUserInfo: any;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    this.tantoData = JSON.parse(localStorage.getItem('tantoClinicInfo'));
  }
  goToTop() {
    this.router.navigate(['/top-menu'])
  }

}
