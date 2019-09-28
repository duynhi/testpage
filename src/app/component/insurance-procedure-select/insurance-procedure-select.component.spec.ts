import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProcedureSelectComponent } from './insurance-procedure-select.component';

describe('InsuranceProcedureSelectComponent', () => {
  let component: InsuranceProcedureSelectComponent;
  let fixture: ComponentFixture<InsuranceProcedureSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProcedureSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProcedureSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
