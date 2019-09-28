import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainanceModeComponent } from './maintainance-mode.component';

describe('MaintainanceModeComponent', () => {
  let component: MaintainanceModeComponent;
  let fixture: ComponentFixture<MaintainanceModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainanceModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainanceModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
