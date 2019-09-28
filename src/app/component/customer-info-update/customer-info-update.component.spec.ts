import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInfoUpdateComponent } from './customer-info-update.component';

describe('CustomerInfoUpdateComponent', () => {
  let component: CustomerInfoUpdateComponent;
  let fixture: ComponentFixture<CustomerInfoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInfoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInfoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
