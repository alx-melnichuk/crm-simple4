import { TestBed } from '@angular/core/testing';

import { MockClientInterceptor } from './mock-client.interceptor';

describe('MockClientInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockClientInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MockClientInterceptor = TestBed.inject(MockClientInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
