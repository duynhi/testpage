import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ForgotPassComponent } from './component/forgot-pass/forgot-pass.component';
import { SettingPassComponent } from './component/setting-pass/setting-pass.component';
import { CreateNewPageComponent } from './component/create-new-page/create-new-page.component';
import { TopMenuComponent } from './component/top-menu/top-menu.component';
import { ScheduleMenuComponent } from './component/schedule-menu/schedule-menu.component';
import { ContractListComponent } from './component/contract-list/contract-list.component';
import { StartCamComponent } from './component/start-cam/start-cam.component';
import { CameraComponent } from './component/camera/camera.component';
import { ConfirmImageComponent } from './component/confirm-image/confirm-image.component';
import { ActiveGuard } from './utils/active.guard';
import { ProductChangeInfoComponent } from './component/product-change-info/product-change-info.component';
import { ProductConfirmComponent } from './component/product-confirm/product-confirm.component';
import { AgencyListComponent } from './component/agency-list/agency-list.component';
import { AgencyInputComponent } from './component/agency-input/agency-input.component';
import { CustomerInfoUpdateComponent } from './component/customer-info-update/customer-info-update.component';
import { CustomerInforFamilyUpdateComponent } from './component/customer-infor-family-update/customer-infor-family-update.component';
import { CustomerMailUpdateComponent } from './component/customer-mail-update/customer-mail-update.component';
import { CustomerMailUpdateSuccessComponent } from './component/customer-mail-update-success/customer-mail-update-success.component';
import { CustomerPasswordUpdateComponent } from './component/customer-password-update/customer-password-update.component';
// tslint:disable-next-line:max-line-length
import { CustomerPasswordUpdateSuccessComponent } from './component/customer-password-update-success/customer-password-update-success.component';
import { CustomerNotificationListComponent } from './component/customer-notification-list/customer-notification-list.component';
import { HtmlComponent } from './component/html/html.component';
import { DocumentListComponent } from './component/document-list/document-list.component';
import { CustomerSettingComponent } from './component/customer-setting/customer-setting.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
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
import { MaintainanceModeComponent } from './component/maintainance-mode/maintainance-mode.component';

const routes: Routes = [
  { path: '', component: TopMenuComponent, canActivate: [ActiveGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'forgot-pass', component: ForgotPassComponent},
  { path: 'create-new-page', component: CreateNewPageComponent},
  { path: 'setting-pass', component: SettingPassComponent, canActivate: [ActiveGuard]},
  { path: 'top-menu', component: TopMenuComponent, canActivate: [ActiveGuard]},
  { path: 'schedule-menu', component: ScheduleMenuComponent, canActivate: [ActiveGuard]},
  { path: 'contract-list', component: ContractListComponent, canActivate: [ActiveGuard]},
  { path: 'start-cam', component: StartCamComponent, canActivate: [ActiveGuard]},
  { path: 'camera', component: CameraComponent, canActivate: [ActiveGuard]},
  { path: 'image-confirm', component: ConfirmImageComponent, canActivate: [ActiveGuard]},
  { path: 'product-change/:id', component: ProductChangeInfoComponent, canActivate: [ActiveGuard]},
  { path: 'product-confirm/:id', component: ProductConfirmComponent, canActivate: [ActiveGuard]},
  { path: 'agency-list', component: AgencyListComponent, canActivate: [ActiveGuard]},
  { path: 'customer-list', component: CustomerListComponent, canActivate: [ActiveGuard]},
  { path: 'agency-input/:id', component: AgencyInputComponent, canActivate: [ActiveGuard]},
  { path: 'customer-setting', component: CustomerSettingComponent, canActivate: [ActiveGuard]},
  { path: 'customer-info-update', component: CustomerInfoUpdateComponent},
  // { path: 'customer-info-update', component: CustomerInfoUpdateComponent, canActivate: [ActiveGuard]},
  { path: 'customer-info-family-update/:id', component: CustomerInforFamilyUpdateComponent, canActivate: [ActiveGuard]},
  { path: 'customer-mail-update', component: CustomerMailUpdateComponent, canActivate: [ActiveGuard]},
  { path: 'customer-mail-update-success', component: CustomerMailUpdateSuccessComponent, canActivate: [ActiveGuard]},
  // { path: 'customer-mail-confirm-success', component: CustomerMailConfirmSuccessComponent, canActivate: [ActiveGuard]},
  { path: 'customer-mail-confirm-success', component: CustomerMailConfirmSuccessComponent},
  { path: 'xxxxx', component: ChangeTokenMailComponent, canActivate: [ActiveGuard]},
  // { path: 'xxxxx', component: ChangeTokenComponent, canActivate: [ActiveGuard]},
  { path: 'customer-password-update', component: CustomerPasswordUpdateComponent, canActivate: [ActiveGuard]},
  { path: 'customer-password-update-success', component: CustomerPasswordUpdateSuccessComponent, canActivate: [ActiveGuard]},
  { path: 'customer-notification-list', component: CustomerNotificationListComponent, canActivate: [ActiveGuard]},
  { path: 'document-list', component: DocumentListComponent, canActivate: [ActiveGuard]},
  { path: 'notifi-list', component: CustomerNotificationListComponent, canActivate: [ActiveGuard]},
  { path: 'html', component: HtmlComponent, canActivate: [ActiveGuard]},
  { path: 'choose-agent', component: ChooseAgentComponent, canActivate: [ActiveGuard]},
  // { path: 'add-agent-success', component: AddAgentSuccessComponent, canActivate: [ActiveGuard]},
  { path: 'add-agent-success', component: AddAgentSuccessComponent},
  { path: 'insurance-procedure-select', component: InsuranceProcedureSelectComponent, canActivate: [ActiveGuard]},
  { path: 'insurance-procedure-register1', component: InsuranceProcedureRegisterComponent, canActivate: [ActiveGuard]},
  { path: 'insurance-procedure-register2', component: InsuranceProcedureRegister2Component, canActivate: [ActiveGuard]},
  { path: 'insurance-procedure-confirm', component: InsuranceProcedureConfirmComponent, canActivate: [ActiveGuard]},
  { path: 'insurance-procedure-regist-success/:id', component: InsuranceProcedureRegistSuccessComponent, canActivate: [ActiveGuard]},
  { path: 'maintain', component: MaintainanceModeComponent, canActivate: [ActiveGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
