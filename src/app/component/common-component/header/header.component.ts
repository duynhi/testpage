import { Component, OnInit, Input } from '@angular/core';
import { faAngleRight, faPhone, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faAngleRight = faAngleRight;
  faPhone = faPhone;
  displayCommon = -1;
  currentSelect = -1;
  faBars = faBars;
  faTimes = faTimes;
  visibleSidebar2;
  // tslint:disable-next-line: max-line-length
  classion: Array<string> = ['pi pi-plus', 'pi pi-plus', 'pi pi-plus', 'pi pi-plus', 'pi pi-plus', 'pi pi-plus', 'pi pi-plus', 'pi pi-plus'];
  // tslint:disable-next-line: variable-name
  display_menu = true;
  // tslint:disable-next-line: variable-name
  constructor(private router: Router) { }
  position = 'PC'; // set breadCrumb position
  ngOnInit() {
  }

  goToTopPage() {
    if (localStorage.getItem('agentCd')) {
      this.router.navigate(['top-menu']);
    }
  }
  goToTop() {
    if (localStorage.getItem('jwtToken')) {
      this.router.navigate(['/top-menu']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toogleDisplay() {
    this.display_menu = !this.display_menu;
  }

  toogleDisplayCommon(id) {
    this.currentSelect = id;
    for (let i = 0; i < this.classion.length; i++) {
      if (id === i) {
        if (this.classion[id] === 'pi pi-plus') {
          this.classion[id] = 'pi pi-minus';
        } else {
          this.classion[id] = 'pi pi-plus';
        }
      } else {
        this.classion[i] = 'pi pi-plus';
      }
    }
    if (this.displayCommon === id) {
      this.displayCommon = -1;
      this.currentSelect = -1;
    } else {
      this.displayCommon = id;

    }

  }
  goToQA() {
    window.open('https://www.hoken-clinic.com/qa/', '_blank');
  }
  onResize(event) {
    if (event.target.innerWidth > 1000) {
      this.visibleSidebar2 = false;
    }
  }

}
