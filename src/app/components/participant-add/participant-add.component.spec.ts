import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantAddComponent } from './participant-add.component';

describe('ParticipantAddComponent', () => {
  let component: ParticipantAddComponent;
  let fixture: ComponentFixture<ParticipantAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
