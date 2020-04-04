import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubComponent } from './user-sub.component';

describe('UserSubComponent', () => {
  let component: UserSubComponent;
  let fixture: ComponentFixture<UserSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
