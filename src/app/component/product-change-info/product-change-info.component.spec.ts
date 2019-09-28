import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductChangeInfoComponent } from './product-change-info.component';

describe('ProductChangeInfoComponent', () => {
  let component: ProductChangeInfoComponent;
  let fixture: ComponentFixture<ProductChangeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductChangeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductChangeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
