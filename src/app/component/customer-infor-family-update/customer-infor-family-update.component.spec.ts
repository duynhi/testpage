import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInforFamilyUpdateComponent } from './customer-infor-family-update.component';

describe('CustomerInforFamilyUpdateComponent', () => {
  let component: CustomerInforFamilyUpdateComponent;
  let fixture: ComponentFixture<CustomerInforFamilyUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInforFamilyUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInforFamilyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
