import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPublishComponent } from './news-publish.component';

describe('NewsPublishComponent', () => {
  let component: NewsPublishComponent;
  let fixture: ComponentFixture<NewsPublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
