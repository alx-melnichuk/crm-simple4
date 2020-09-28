import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from '../../_decorators/auto-unsubscribe';
import { TaskDto } from '../_interfaces/task-dto.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
@AutoUnsubscribe()
export class TaskListComponent implements OnInit {

  public labelName = 'Task list';
  public taskList: TaskDto[];

  private unsubTaskList: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.unsubTaskList = this.route.data
      .subscribe((data: { taskList: TaskDto[] }) => {
        this.taskList = (data.taskList || []);
      });
  }

}
