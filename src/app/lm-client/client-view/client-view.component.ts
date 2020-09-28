import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { AutoUnsubscribe } from '../../_decorators/auto-unsubscribe';
import { ClientDto } from '../_interfaces/client-dto.interface';
import { RP_CLIENT_ID } from '../_consts/lm-client.consts';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
@AutoUnsubscribe()
export class ClientViewComponent implements OnInit {

  public labelName = 'List of clients';
  public clientId: number;
  public client: ClientDto;

  private unsubClient: Subscription;
  private unsubClientId: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.unsubClient = this.route.data
      .subscribe((data: { clientView: ClientDto[] }) => {
        const clientList: ClientDto[] = (data.clientView || []);
        this.client = (clientList.length > 0 ? clientList[0] : null);
      });

    this.unsubClientId = this.route.paramMap
      .subscribe((params: ParamMap) => {
        if (params.has(RP_CLIENT_ID)) {
          const clientIdText = params.get(RP_CLIENT_ID);
          this.clientId = (!!clientIdText ? Number(clientIdText) : null);
        }
      });
  }
}
