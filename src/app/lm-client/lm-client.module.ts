import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tracing } from './_consts/lm-client.consts';
import { LmClientRoutingModule } from './lm-client-routing.module';
import { LmClientComponent } from './lm-client.component';
import { ClientListModule } from './client-list/client-list.module';
import { ClientViewModule } from './client-view/client-view.module';
import { ClientApiService } from './_services/client-api.service';

@NgModule({
  declarations: [LmClientComponent],
  imports: [
    CommonModule,
    LmClientRoutingModule,
    ClientListModule,
    ClientViewModule
  ],
  providers: [
    ClientApiService
  ]
})
export class LmClientModule {
  constructor() {
    Tracing.log('LmClientModule();');
  }
}
