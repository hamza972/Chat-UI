import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { roleProfile6Component } from './roleProfile6.component';

describe('roleProfile6Component', () => {
  let component: roleProfile6Component;
  let fixture: ComponentFixture<roleProfile6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ roleProfile6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(roleProfile6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
