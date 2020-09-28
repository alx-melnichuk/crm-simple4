import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tracing } from './_consts/lm-task.consts';
import { LmTaskRoutingModule } from './lm-task-routing.module';
import { LmTaskComponent } from './lm-task.component';
import { TaskListModule } from './task-list/task-list.module';
import { TaskViewModule } from './task-view/task-view.module';
import { TaskApiService } from './_services/task-api.service';

@NgModule({
  declarations: [LmTaskComponent],
  imports: [
    CommonModule,
    LmTaskRoutingModule,
    TaskListModule,
    TaskViewModule
  ],
  providers: [
    TaskApiService
  ]
})
export class LmTaskModule {
  constructor() {
    Tracing.log('LmTaskModule();');
  }
}
