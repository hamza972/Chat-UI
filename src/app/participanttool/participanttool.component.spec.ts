import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanttoolComponent } from './participanttool.component';

describe('ParticipanttoolComponent', () => {
  let component: ParticipanttoolComponent;
  let fixture: ComponentFixture<ParticipanttoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipanttoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanttoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
