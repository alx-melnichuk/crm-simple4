import { Component, OnInit, Input } from '@angular/core';

import { TaskDto } from '../../_interfaces/task-dto.interface';

@Component({
  selector: 'app-t-v-middle',
  templateUrl: './t-v-middle.component.html',
  styleUrls: ['./t-v-middle.component.scss']
})
export class TVMiddleComponent implements OnInit {

  @Input()
  public task: TaskDto;

  constructor() {
  }

  ngOnInit(): void {
    this.task = (this.task || ({} as TaskDto));
  }

}
