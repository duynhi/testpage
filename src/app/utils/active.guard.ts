import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements  CanActivate {
  constructor(private router: Router, private route: ActivatedRoute) {}
  canActivate() {
    if (localStorage.getItem('jwtToken')) {
      // if (localStorage.getItem('registF') === '1') {
      //   return this.router.navigate(['setting-pass']);
      // }
      return true;
    } else {
      return this.router.navigate(['login']);
    }
  }
}
