import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNotificationListComponent } from './customer-notification-list.component';

describe('CustomerNotificationListComponent', () => {
  let component: CustomerNotificationListComponent;
  let fixture: ComponentFixture<CustomerNotificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNotificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
