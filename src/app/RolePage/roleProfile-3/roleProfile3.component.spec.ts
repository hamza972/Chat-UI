import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { roleProfile3Component } from './roleProfile3.component';

describe('roleProfile3Component', () => {
  let component: roleProfile3Component;
  let fixture: ComponentFixture<roleProfile3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ roleProfile3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(roleProfile3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
