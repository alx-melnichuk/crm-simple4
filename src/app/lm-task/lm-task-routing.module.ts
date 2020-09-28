import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LmTaskComponent } from './lm-task.component';
import { RB_LIST, RB_VIEW_TASK_ID, TaskPermission } from './_consts/lm-task.consts';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { TaskListResolverService } from './task-list/_resolvers/task-list-resolver.service';
import { TaskViewResolverService } from './task-view/_resolvers/task-view-resolver.service';
import { PermissionsGuard } from '../_guards/permissions.guard';

const itemRoutes: Routes = [
  {
    path: RB_LIST,
    component: TaskListComponent,
    data: {
      permissions: [TaskPermission.taskList]
    },
    canActivate: [PermissionsGuard],
    resolve: {
      taskList: TaskListResolverService
    }
  },
  {
    path: RB_VIEW_TASK_ID,
    component: TaskViewComponent,
    data: {
      permissions: [TaskPermission.taskView]
    },
    canActivate: [PermissionsGuard],
    resolve: {
      taskView: TaskViewResolverService
    }
  },
  {
    path: '**',
    redirectTo: RB_LIST
  }
];

const routes: Routes = [
  { path: '', component: LmTaskComponent, children: itemRoutes }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TaskListResolverService,
    TaskViewResolverService
  ]
})
export class LmTaskRoutingModule { }
