import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMailConfirmSuccessComponent } from './customer-mail-confirm-success.component';

describe('CustomerMailConfirmSuccessComponent', () => {
  let component: CustomerMailConfirmSuccessComponent;
  let fixture: ComponentFixture<CustomerMailConfirmSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMailConfirmSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMailConfirmSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
