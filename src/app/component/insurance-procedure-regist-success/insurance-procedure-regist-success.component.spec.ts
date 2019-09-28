import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProcedureRegistSuccessComponent } from './insurance-procedure-regist-success.component';

describe('InsuranceProcedureRegistSuccessComponent', () => {
  let component: InsuranceProcedureRegistSuccessComponent;
  let fixture: ComponentFixture<InsuranceProcedureRegistSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProcedureRegistSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProcedureRegistSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
