import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tables2Component } from './tables2.component';

describe('Tables2Component', () => {
  let component: Tables2Component;
  let fixture: ComponentFixture<Tables2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tables2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tables2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
