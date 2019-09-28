import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrProcessComponent } from './ocr-process.component';

describe('OcrProcessComponent', () => {
  let component: OcrProcessComponent;
  let fixture: ComponentFixture<OcrProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
