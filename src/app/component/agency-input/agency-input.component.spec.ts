import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyInputComponent } from './agency-input.component';

describe('AgencyInputComponent', () => {
  let component: AgencyInputComponent;
  let fixture: ComponentFixture<AgencyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
