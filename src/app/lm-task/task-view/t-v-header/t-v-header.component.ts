import { Component, OnInit, Input } from '@angular/core';
import { RT_LM_TASK_LIST } from '../../_consts/lm-task.consts';


@Component({
  selector: 'app-t-v-header',
  templateUrl: './t-v-header.component.html',
  styleUrls: ['./t-v-header.component.scss']
})
export class TVHeaderComponent implements OnInit {

  @Input()
  public labelName: string;

  public routerLink: string;

  constructor() { }

  ngOnInit(): void {
    this.routerLink = RT_LM_TASK_LIST;
  }

}
