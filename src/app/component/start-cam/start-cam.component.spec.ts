import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCamComponent } from './start-cam.component';

describe('StartCamComponent', () => {
  let component: StartCamComponent;
  let fixture: ComponentFixture<StartCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
