import { TestBed } from '@angular/core/testing';

import { EmailDistributionService } from './EmailDistrobutionList.service';

describe('EmailDistributionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Notification = TestBed.get(EmailDistributionService);
    expect(service).toBeTruthy();
  });
});