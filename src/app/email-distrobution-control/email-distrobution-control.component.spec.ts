import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDistrobutionControlComponent } from './email-distrobution-control.component';

describe('EmailDistrobutionControlComponent', () => {
  let component: EmailDistrobutionControlComponent;
  let fixture: ComponentFixture<EmailDistrobutionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailDistrobutionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDistrobutionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
