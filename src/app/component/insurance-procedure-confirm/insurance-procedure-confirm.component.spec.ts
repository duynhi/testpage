import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProcedureConfirmComponent } from './insurance-procedure-confirm.component';

describe('InsuranceProcedureConfirmComponent', () => {
  let component: InsuranceProcedureConfirmComponent;
  let fixture: ComponentFixture<InsuranceProcedureConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProcedureConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProcedureConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
