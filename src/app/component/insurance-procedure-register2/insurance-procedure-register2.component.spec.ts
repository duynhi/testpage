import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProcedureRegister2Component } from './insurance-procedure-register2.component';

describe('InsuranceProcedureRegister2Component', () => {
  let component: InsuranceProcedureRegister2Component;
  let fixture: ComponentFixture<InsuranceProcedureRegister2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProcedureRegister2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProcedureRegister2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
