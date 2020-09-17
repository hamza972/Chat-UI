import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { roleProfile4Component } from './roleProfile4.component';

describe('roleProfile4Component', () => {
  let component: roleProfile4Component;
  let fixture: ComponentFixture<roleProfile4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ roleProfile4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(roleProfile4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
