import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { TaskDto } from '../../_interfaces/task-dto.interface';
import { TaskApiService } from '../../_services/task-api.service';
import { RP_TASK_ID } from '../../_consts/lm-task.consts';

@Injectable({
  providedIn: 'root'
})
export class TaskViewResolverService implements Resolve<TaskDto[]> {

  constructor(private taskApiService: TaskApiService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TaskDto[] | Observable<TaskDto[]> | Promise<TaskDto[]> {
    const ids = [];
    if (route.paramMap.has(RP_TASK_ID)) {
      const taskIdText = route.paramMap.get(RP_TASK_ID);
      if (!!taskIdText) {
        ids.push(Number(taskIdText));
      }
    }
    return this.taskApiService.getData({ ids })
      .pipe(
        take(1) // https://v9.angular.io/guide/router#resolve-pre-fetching-component-data (crisis-detail-resolver.service.ts)
      );
  }

}
