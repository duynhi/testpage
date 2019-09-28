import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPasswordUpdateComponent } from './customer-password-update.component';

describe('CustomerPasswordUpdateComponent', () => {
  let component: CustomerPasswordUpdateComponent;
  let fixture: ComponentFixture<CustomerPasswordUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPasswordUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
