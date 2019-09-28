import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTokenComponent } from './change-token.component';

describe('ChangeTokenComponent', () => {
  let component: ChangeTokenComponent;
  let fixture: ComponentFixture<ChangeTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
