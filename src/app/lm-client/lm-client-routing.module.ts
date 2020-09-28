import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LmClientComponent } from './lm-client.component';
import { RB_LIST, RB_VIEW_CLIENT_ID, ClientPermission } from './_consts/lm-client.consts';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientListResolverService } from './client-list/_resolvers/client-list-resolver.service';
import { ClientViewResolverService } from './client-view/_resolvers/client-view-resolver.service';
import { PermissionsGuard } from '../_guards/permissions.guard';

const itemRoutes: Routes = [
  {
    path: RB_LIST,
    component: ClientListComponent,
    data: {
      permissions: [ClientPermission.clientList]
    },
    canActivate: [PermissionsGuard],
    resolve: {
      clientList: ClientListResolverService
    }
  },
  {
    path: RB_VIEW_CLIENT_ID,
    component: ClientViewComponent,
    data: {
      permissions: [ClientPermission.clientView]
    },
    canActivate: [PermissionsGuard],
    resolve: {
      clientView: ClientViewResolverService
    }
  },
  {
    path: '**',
    redirectTo: RB_LIST
  }
];

const routes: Routes = [
  { path: '', component: LmClientComponent, children: itemRoutes }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ClientListResolverService,
    ClientViewResolverService
  ]
})
export class LmClientRoutingModule { }
