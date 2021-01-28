import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateEditComponent } from './affiliate-edit.component';

describe('AffiliateEditComponent', () => {
  let component: AffiliateEditComponent;
  let fixture: ComponentFixture<AffiliateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
