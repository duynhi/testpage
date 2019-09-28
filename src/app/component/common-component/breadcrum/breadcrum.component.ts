import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadCrumb } from './breadcrumb';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent implements OnInit {
  breadcrumbs$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(event => this.buildBreadCrumb(this.activatedRoute.root))
  );

  showLink = false;

  listNameURL = [];
  listBreadcrumb = [];
  listName = [];
  commonURL = environment.linkUrl;
  @Input() breadcrumb: string;

  // Build your breadcrumb starting with the root route of your current activated route

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title) {
  }

  ngOnInit() {
    let currentHreft = window.location.href;
    this.showLink = currentHreft.includes("/login") || currentHreft.includes("/create-new-page") || currentHreft.includes("/forgot-pass");
    this.initNameURL();
    this.listNameURL.forEach((nameUrl) => {
      if (nameUrl.url === window.location.href || window.location.href.includes(nameUrl.url)) {
        this.titleService.setTitle(nameUrl.name);
      }
    });
    this.listBreadcrumb = JSON.parse(sessionStorage.getItem('beadcrum'));
    if (window.location.href === this.commonURL + 'login') {
      this.listBreadcrumb = [this.commonURL + 'login'];
      sessionStorage.setItem('beadcrum', JSON.stringify(this.listBreadcrumb));
    } else if (window.location.href === this.commonURL + 'top-menu') {
      this.listBreadcrumb = [this.commonURL + 'top-menu'];
      sessionStorage.setItem('beadcrum', JSON.stringify(this.listBreadcrumb));
    } else if (window.location.href === this.commonURL + 'maintain') {
      this.listBreadcrumb = [this.commonURL + 'maintain'];
      sessionStorage.setItem('beadcrum', JSON.stringify(this.listBreadcrumb));
    } else {
      if (this.listBreadcrumb && this.listBreadcrumb[this.listBreadcrumb.length - 1] !== window.location.href) {
        if (this.listBreadcrumb.includes(window.location.href)) {
          const index = this.listBreadcrumb.indexOf(window.location.href);
          this.listBreadcrumb.length = index + 1;
        } else {
          this.listBreadcrumb.push(window.location.href);
        }
      }
      sessionStorage.setItem('beadcrum', JSON.stringify(this.listBreadcrumb));
    }
    if (this.listBreadcrumb) {
      this.listBreadcrumb.forEach((breadcrumb) => {
        this.listNameURL.forEach((nameurl) => {
          if (nameurl.url === breadcrumb || breadcrumb.includes(nameurl.url)) {
            this.listName.push(nameurl.name);
          }
        });
      });
    }
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '',
    breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    // If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl,
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  initNameURL() {
    this.listNameURL = [
      {
        name: 'マイページ',
        url: this.commonURL + 'top-menu',
      },
      {
        name: 'マイページログイン',
        url: this.commonURL + 'login',
      },
      {
        name: 'マイページログイン',
        url: this.commonURL + 'forgot-pass',
      },
      {
        name: 'マイページ登録',
        url: this.commonURL + 'create-new-page',
      },
      {
        name: 'マイページログイン',
        url: this.commonURL + 'setting-pass',
      },
      {
        name: 'ご予約',
        url: this.commonURL + 'schedule-menu',
      },
      {
        name: 'ご契約一覧',
        url: this.commonURL + 'contract-list',
      },
      {
        name: 'カメラ起動前',
        url: this.commonURL + 'start-cam',
      },
      {
        name: '自動画像補正中',
        url: this.commonURL + 'camera',
      },
      {
        name: '（自動）写真確認',
        url: this.commonURL + 'image-confirm',
      },
      {
        name: '商品情報変更',
        url: this.commonURL + 'product-change/',
      },
      {
        name: '商品情報確認',
        url: this.commonURL + 'product-confirm/',
      },
      {
        name: '代理店一覧',
        url: this.commonURL + 'agency-list',
      },
      {
        name: 'ご本人・ご家族一覧',
        url: this.commonURL + 'customer-list',
      },
      {
        name: '代理店入力',
        url: this.commonURL + 'agency-input/',
      },
      {
        name: 'お客様情報設定',
        url: this.commonURL + 'customer-setting',
      },
      {
        name: 'ご本人の設定',
        url: this.commonURL + 'customer-info-update',
      },
      {
        name: 'ご家族の設定',
        url: this.commonURL + 'customer-info-family-update/',
      },
      {
        name: 'メールアドレス変更',
        url: this.commonURL + 'customer-mail-update',
      },
      {
        name: 'メールアドレス変更完了',
        url: this.commonURL + 'customer-mail-update-success',
      },
      {
        name: 'パスワード変更',
        url: this.commonURL + 'customer-password-update',
      },
      {
        name: 'メールアドレス変更確認完了',
        url: this.commonURL + 'customer-mail-confirm-success',
      },
      {
        name: 'パスワード変更完了',
        url: this.commonURL + 'customer-password-update-success',
      },
      {
        name: 'お知らせ一覧',
        url: this.commonURL + 'customer-notification-list',
      },
      {
        name: 'ご相談時の資料',
        url: this.commonURL + 'document-list',
      },
      {
        name: 'お知らせ一覧',
        url: this.commonURL + 'notifi-list',
      },
      {
        name: '店舗選択',
        url: this.commonURL + 'choose-agent',
      },
      {
        name: '店舗追加確認完了',
        url: this.commonURL + 'add-agent-success',
      },
      {
        name: '保険手続き選択',
        url: this.commonURL + 'insurance-procedure-select',
      },
      {
        name: '保険手続き入力',
        url: this.commonURL + 'insurance-procedure-register1',
      },
      {
        name: '保険手続き入力',
        url: this.commonURL + 'insurance-procedure-register2',
      },
      {
        name: '保険手続き確認',
        url: this.commonURL + 'insurance-procedure-confirm',
      },
      {
        name: '保険手続き登録完了',
        url: this.commonURL + 'insurance-procedure-regist-success',
      },
      {
        name: 'メンテナンスモード',
        url: this.commonURL + 'maintain',
      },
    ];
  }

}
