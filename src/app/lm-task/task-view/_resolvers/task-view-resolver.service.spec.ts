import { TestBed } from '@angular/core/testing';

import { TaskViewResolverService } from './task-view-resolver.service';

describe('TaskViewResolverService', () => {
  let service: TaskViewResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskViewResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
