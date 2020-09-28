import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tracing, HOST_API } from '../_consts/lm-client.consts';
import { ClientDto } from '../_interfaces/client-dto.interface';

export const API_CLIENT = HOST_API + '/client';
export const QP_CLIENT_IDS = 'ids';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  constructor(private http: HttpClient) {
    Tracing.log('ClientApiService();');
  }

  public getData(data: { ids: number[] }): Observable<ClientDto[]> {
    let params: HttpParams = new HttpParams();
    params = params.append(QP_CLIENT_IDS, String(data.ids || []));
    return this.http.get<ClientDto[]>(API_CLIENT, { params });
  }
}
