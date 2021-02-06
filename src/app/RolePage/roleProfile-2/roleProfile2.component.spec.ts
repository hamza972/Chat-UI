import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { roleProfile2Component } from './roleProfile2.component';

describe('roleProfile2Component', () => {
  let component: roleProfile2Component;
  let fixture: ComponentFixture<roleProfile2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ roleProfile2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(roleProfile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
