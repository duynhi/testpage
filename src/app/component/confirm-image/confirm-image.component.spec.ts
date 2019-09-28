import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmImageComponent } from './confirm-image.component';

describe('ConfirmImageComponent', () => {
  let component: ConfirmImageComponent;
  let fixture: ComponentFixture<ConfirmImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
