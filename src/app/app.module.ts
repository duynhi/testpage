import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Angular2UsefulSwiperModule } from 'angular2-useful-swiper';
import {APP_BASE_HREF} from '@angular/common';

import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {PasswordModule} from 'primeng/password';
import {SidebarModule} from 'primeng/sidebar';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {FileUploadModule} from 'primeng/fileupload';
import {PickListModule} from 'primeng/picklist';
import {PanelModule} from 'primeng/panel';
import {AccordionModule} from 'primeng/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { FooterComponent } from './component/common-component/footer/footer.component';
import { HeaderComponent } from './component/common-component/header/header.component';
import { ForgotPassComponent } from './component/forgot-pass/forgot-pass.component';
import { FooterLinkComponent } from './component/common-component/footer-link/footer-link.component';
import { SettingPassComponent } from './component/setting-pass/setting-pass.component';
import { CreateNewPageComponent } from './component/create-new-page/create-new-page.component';
import { TopMenuComponent } from './component/top-menu/top-menu.component';
import { ScheduleMenuComponent } from './component/schedule-menu/schedule-menu.component';
import { ContractListComponent } from './component/contract-list/contract-list.component';
import { StartCamComponent } from './component/start-cam/start-cam.component';
import { CameraComponent } from './component/camera/camera.component';
import { ConfirmImageComponent } from './component/confirm-image/confirm-image.component';
import { OcrProcessComponent } from './component/ocr-process/ocr-process.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TokenInterceptor } from './service/interceptor/token.interceptor';
import { JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { LoadingComponent } from './component/common-component/loading/loading.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActiveGuard } from './utils/active.guard';
import { PopupComponent } from './component/common-component/popup/popup.component';
import { ProductChangeInfoComponent } from './component/product-change-info/product-change-info.component';
import { ProductConfirmComponent } from './component/product-confirm/product-confirm.component';
import { CustomerSettingComponent } from './component/customer-setting/customer-setting.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
// import { CustomerUpdateComponent } from './component/customer-update/customer-update.component';
import { AgencyListComponent } from './component/agency-list/agency-list.component';
import { AgencyInputComponent } from './component/agency-input/agency-input.component';
import { MailUpdateComponent } from './component/mail-update/mail-update.component';
import { DocumentListComponent } from './component/document-list/document-list.component';
import { HtmlComponent } from './component/html/html.component';
import { CustomerInfoUpdateComponent } from './component/customer-info-update/customer-info-update.component';
import { CustomerInforFamilyUpdateComponent } from './component/customer-infor-family-update/customer-infor-family-update.component';
import { CustomerMailUpdateComponent } from './component/customer-mail-update/customer-mail-update.component';
import { CustomerMailUpdateSuccessComponent } from './component/customer-mail-update-success/customer-mail-update-success.component';
import { CustomerPasswordUpdateComponent } from './component/customer-password-update/customer-password-update.component';
// tslint:disable-next-line:max-line-length
import { CustomerPasswordUpdateSuccessComponent } from './component/customer-password-update-success/customer-password-update-success.component';
import { CustomerNotificationListComponent } from './component/customer-notification-list/customer-notification-list.component';
import { InsuranceProcedureSelectComponent } from './component/insurance-procedure-select/insurance-procedure-select.component';
import { InsuranceProcedureRegisterComponent } from './component/insurance-procedure-register/insurance-procedure-register.component';
import { InsuranceProcedureConfirmComponent } from './component/insurance-procedure-confirm/insurance-procedure-confirm.component';
// tslint:disable-next-line:max-line-length
import { InsuranceProcedureRegistSuccessComponent } from './component/insurance-procedure-regist-success/insurance-procedure-regist-success.component';
import { InsuranceProcedureRegister2Component } from './component/insurance-procedure-register2/insurance-procedure-register2.component';
import { CustomerMailConfirmSuccessComponent } from './component/customer-mail-confirm-success/customer-mail-confirm-success.component';
import { ChooseAgentComponent } from './component/choose-agent/choose-agent.component';
import { AddAgentSuccessComponent } from './component/add-agent-success/add-agent-success.component';
import { ChangeTokenComponent } from './component/change-token/change-token.component';
import { ChangeTokenMailComponent } from './component/change-token-mail/change-token-mail.component';
import { BreadcrumComponent } from './component/common-component/breadcrum/breadcrum.component';
import { MaintainanceModeComponent } from './component/maintainance-mode/maintainance-mode.component';
import { GlobalValueService } from './service/global-value-service';

// import { HttpIntercepter } from './service/interceptor/http-intercepter';
export function getToken(): string {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    ForgotPassComponent,
    FooterLinkComponent,
    SettingPassComponent,
    CreateNewPageComponent,
    TopMenuComponent,
    ScheduleMenuComponent,
    ContractListComponent,
    StartCamComponent,
    CameraComponent,
    ConfirmImageComponent,
    OcrProcessComponent,
    LoadingComponent,
    PopupComponent,
    ProductChangeInfoComponent,
    ProductConfirmComponent,
    CustomerSettingComponent,
    CustomerListComponent,
    // CustomerUpdateComponent,
    AgencyListComponent,
    AgencyInputComponent,
    MailUpdateComponent,
    DocumentListComponent,
    HtmlComponent,
    CustomerInfoUpdateComponent,
    CustomerInforFamilyUpdateComponent,
    CustomerMailUpdateComponent,
    CustomerMailUpdateSuccessComponent,
    CustomerPasswordUpdateComponent,
    CustomerPasswordUpdateSuccessComponent,
    CustomerNotificationListComponent,
    InsuranceProcedureSelectComponent,
    InsuranceProcedureRegisterComponent,
    InsuranceProcedureConfirmComponent,
    InsuranceProcedureRegistSuccessComponent,
    InsuranceProcedureRegister2Component,
    CustomerMailConfirmSuccessComponent,
    ChooseAgentComponent,
    AddAgentSuccessComponent,
    ChangeTokenComponent,
    ChangeTokenMailComponent,
    BreadcrumComponent,
    MaintainanceModeComponent
  ],
  imports: [
    // Angular2UsefulSwiperModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    AccordionModule,
    PanelModule,
    ConfirmDialogModule,
    PickListModule,
    FileUploadModule,
    ProgressSpinnerModule,
    CalendarModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    PasswordModule,
    SidebarModule,
    FontAwesomeModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    KeyFilterModule,
    CarouselModule,
    ToastModule,
    DialogModule,
    InfiniteScrollModule
  ],
  providers: [CookieService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    // {provide: APP_BASE_HREF, useValue: '/mypage'},
    // { provide: HTTP_INTERCEPTORS, useClass: HttpIntercepter, multi: true },
    MessageService,
    ActiveGuard,
    GlobalValueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
