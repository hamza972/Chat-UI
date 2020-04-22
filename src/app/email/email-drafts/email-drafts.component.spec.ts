import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDraftsComponent } from './email-drafts.component';

describe('EmailDraftsComponent', () => {
  let component: EmailDraftsComponent;
  let fixture: ComponentFixture<EmailDraftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailDraftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
