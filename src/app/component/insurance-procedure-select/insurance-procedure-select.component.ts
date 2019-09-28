import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-procedure-select',
  templateUrl: './insurance-procedure-select.component.html',
  styleUrls: ['./insurance-procedure-select.component.scss']
})
export class InsuranceProcedureSelectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToInput(id) {
    if (id === 1) {
      this.router.navigate(['/insurance-procedure-register1']);
    } else {
      this.router.navigate(['/insurance-procedure-register2']);

    }
  }

}
