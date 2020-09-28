import { Component, OnInit, Input } from '@angular/core';

import { RT_LM_CLIENT_LIST } from '../../_consts/lm-client.consts';

@Component({
  selector: 'app-c-v-header',
  templateUrl: './c-v-header.component.html',
  styleUrls: ['./c-v-header.component.scss']
})
export class CVHeaderComponent implements OnInit {

  @Input()
  public labelName: string;

  public routerLink: string;

  constructor() { }

  ngOnInit(): void {
    this.routerLink = RT_LM_CLIENT_LIST;
  }
}
