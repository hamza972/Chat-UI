import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailViewDistroListsComponent } from './email-view-distro-lists.component';

describe('EmailViewDistroListsComponent', () => {
  let component: EmailViewDistroListsComponent;
  let fixture: ComponentFixture<EmailViewDistroListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailViewDistroListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailViewDistroListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
