import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoletoolComponent } from './roletool.component';

describe('RoletoolComponent', () => {
  let component: RoletoolComponent;
  let fixture: ComponentFixture<RoletoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoletoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoletoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
