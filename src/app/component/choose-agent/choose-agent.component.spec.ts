import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAgentComponent } from './choose-agent.component';

describe('ChooseAgentComponent', () => {
  let component: ChooseAgentComponent;
  let fixture: ComponentFixture<ChooseAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
