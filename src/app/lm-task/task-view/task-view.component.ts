import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from '../../_decorators/auto-unsubscribe';
import { TaskDto } from '../_interfaces/task-dto.interface';
import { RP_TASK_ID } from '../_consts/lm-task.consts';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
@AutoUnsubscribe()
export class TaskViewComponent implements OnInit {

  public labelName = 'Task list';
  public taskId: number;
  public task: TaskDto;

  private unsubTask: Subscription;
  private unsubTaskId: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.unsubTask = this.route.data
      .subscribe((data: { taskView: TaskDto[] }) => {
        const taskList: TaskDto[] = (data.taskView || []);
        this.task = (taskList.length > 0 ? taskList[0] : null);
      });

    this.unsubTaskId = this.route.paramMap
      .subscribe((params: ParamMap) => {
        if (params.has(RP_TASK_ID)) {
          const taskIdText = params.get(RP_TASK_ID);
          this.taskId = (!!taskIdText ? Number(taskIdText) : null);
        }
      });
  }

}
