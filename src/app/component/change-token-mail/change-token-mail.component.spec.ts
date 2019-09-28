import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTokenMailComponent } from './change-token-mail.component';

describe('ChangeTokenMailComponent', () => {
  let component: ChangeTokenMailComponent;
  let fixture: ComponentFixture<ChangeTokenMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTokenMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTokenMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
