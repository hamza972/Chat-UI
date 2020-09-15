import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { roleProfile1Component } from './roleProfile1.component';

describe('roleProfile1Component', () => {
  let component: roleProfile1Component;
  let fixture: ComponentFixture<roleProfile1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ roleProfile1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(roleProfile1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
