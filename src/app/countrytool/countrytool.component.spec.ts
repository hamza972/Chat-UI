import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrytoolComponent } from './countrytool.component';

describe('CountrytoolComponent', () => {
  let component: CountrytoolComponent;
  let fixture: ComponentFixture<CountrytoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrytoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrytoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
