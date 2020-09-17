import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { roleProfile9Component } from './roleProfile9.component';

describe('roleProfile9Component', () => {
  let component: roleProfile9Component;
  let fixture: ComponentFixture<roleProfile9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ roleProfile9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(roleProfile9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
