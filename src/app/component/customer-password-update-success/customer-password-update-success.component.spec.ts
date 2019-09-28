import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPasswordUpdateSuccessComponent } from './customer-password-update-success.component';

describe('CustomerPasswordUpdateSuccessComponent', () => {
  let component: CustomerPasswordUpdateSuccessComponent;
  let fixture: ComponentFixture<CustomerPasswordUpdateSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPasswordUpdateSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPasswordUpdateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
