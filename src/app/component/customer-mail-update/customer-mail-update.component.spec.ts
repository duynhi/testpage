import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMailUpdateComponent } from './customer-mail-update.component';

describe('CustomerMailUpdateComponent', () => {
  let component: CustomerMailUpdateComponent;
  let fixture: ComponentFixture<CustomerMailUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMailUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
