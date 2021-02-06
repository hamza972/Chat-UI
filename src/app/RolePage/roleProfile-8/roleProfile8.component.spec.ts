import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { roleProfile8Component } from './roleProfile8.component';

describe('roleProfile8Component', () => {
  let component: roleProfile8Component;
  let fixture: ComponentFixture<roleProfile8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ roleProfile8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(roleProfile8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
