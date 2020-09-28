import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ClientDto } from '../../_interfaces/client-dto.interface';
import { RT_LM_CLIENT_VIEW_CLIENT_ID, RP_CLIENT_ID } from '../../_consts/lm-client.consts';

@Component({
  selector: 'app-c-l-middle',
  templateUrl: './c-l-middle.component.html',
  styleUrls: ['./c-l-middle.component.scss']
})
export class CLMiddleComponent implements OnInit {

  @Input()
  public clientList: ClientDto[];

  public displayedColumns: string[] = [
    'id',
    'surname',
    'name',
    'patronymic',
   // 'email',
   // 'phone',
    'source',
    'city',
    'webSite',
    'hasContract',
    // 'description',
    // 'message',
    // 'interest',
    // 'preference',
    'howFound',
    'isRealClient',
    'payment'
  ];

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  // ** Public API **

  public clickRow(client: ClientDto): void {
    if (client != null && client.id != null) {
      const url = RT_LM_CLIENT_VIEW_CLIENT_ID.replace(':' + RP_CLIENT_ID, '');
      this.router.navigate([url, client.id]);
    }
  }

}
