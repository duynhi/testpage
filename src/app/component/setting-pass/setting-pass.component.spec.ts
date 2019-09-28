import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPassComponent } from './setting-pass.component';

describe('SettingPassComponent', () => {
  let component: SettingPassComponent;
  let fixture: ComponentFixture<SettingPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
