import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { RP_CLIENT_ID } from '../../_consts/lm-client.consts';
import { ClientDto } from '../../_interfaces/client-dto.interface';
import { ClientApiService } from '../../_services/client-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientViewResolverService implements Resolve<ClientDto[]> {

  constructor(
    private clientApiService: ClientApiService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ClientDto[] | Observable<ClientDto[]> | Promise<ClientDto[]> {
    const ids = [];
    if (route.paramMap.has(RP_CLIENT_ID)) {
      const clientIdText = route.paramMap.get(RP_CLIENT_ID);
      if (!!clientIdText) {
        ids.push(Number(clientIdText));
      }
    }
    return this.clientApiService.getData({ ids })
      .pipe(
        take(1) // https://v9.angular.io/guide/router#resolve-pre-fetching-component-data (crisis-detail-resolver.service.ts)
      );
  }
}
