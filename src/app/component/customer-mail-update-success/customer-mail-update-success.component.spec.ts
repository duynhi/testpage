import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMailUpdateSuccessComponent } from './customer-mail-update-success.component';

describe('ComerMailUpdateSuccessComponent', () => {
  let component: CustomerMailUpdateSuccessComponent;
  let fixture: ComponentFixture<CustomerMailUpdateSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMailUpdateSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMailUpdateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
