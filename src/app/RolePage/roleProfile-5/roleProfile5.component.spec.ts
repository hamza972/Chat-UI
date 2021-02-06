import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { roleProfile5Component } from './roleProfile5.component';

describe('roleProfile5Component', () => {
  let component: roleProfile5Component;
  let fixture: ComponentFixture<roleProfile5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ roleProfile5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(roleProfile5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
