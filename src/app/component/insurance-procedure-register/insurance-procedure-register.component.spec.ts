import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProcedureRegisterComponent } from './insurance-procedure-register.component';

describe('InsuranceProcedureRegisterComponent', () => {
  let component: InsuranceProcedureRegisterComponent;
  let fixture: ComponentFixture<InsuranceProcedureRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProcedureRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProcedureRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
