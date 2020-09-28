import { TestBed } from '@angular/core/testing';

import { ClientViewResolverService } from './client-view-resolver.service';

describe('ClientViewResolverService', () => {
  let service: ClientViewResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientViewResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
