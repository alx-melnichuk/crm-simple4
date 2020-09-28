import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { TaskApiService } from '../../_services/task-api.service';
import { TaskDto } from '../../_interfaces/task-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskListResolverService implements Resolve<TaskDto[]> {

  constructor(private taskApiService: TaskApiService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TaskDto[] | Observable<TaskDto[]> | Promise<TaskDto[]> {
    return this.taskApiService.getData({ ids: [] })
      .pipe(
        take(1) // https://v9.angular.io/guide/router#resolve-pre-fetching-component-data (crisis-detail-resolver.service.ts)
      );
  }

}
