import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDeletedComponent } from './email-deleted.component';

describe('EmailDeletedComponent', () => {
  let component: EmailDeletedComponent;
  let fixture: ComponentFixture<EmailDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
