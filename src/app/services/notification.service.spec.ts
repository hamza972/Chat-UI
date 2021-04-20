import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('AffiliateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Notification = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});