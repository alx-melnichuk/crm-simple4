import { TestBed } from '@angular/core/testing';

import { MockTaskInterceptor } from './mock-task.interceptor';

describe('MockTaskInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockTaskInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MockTaskInterceptor = TestBed.inject(MockTaskInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
