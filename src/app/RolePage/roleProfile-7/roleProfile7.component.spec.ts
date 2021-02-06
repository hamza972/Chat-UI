import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { roleProfile7Component } from './roleProfile7.component';

describe('roleProfile7Component', () => {
  let component: roleProfile7Component;
  let fixture: ComponentFixture<roleProfile7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ roleProfile7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(roleProfile7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
