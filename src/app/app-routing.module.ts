import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionsGuard } from './_guards/permissions.guard';
import { RB_LM_CLIENT, RB_LM_TASK, LoadPermission } from './_consts/app.consts';

const routes: Routes = [
  {
    path: RB_LM_CLIENT,
    loadChildren: () => import('./lm-client/lm-client.module').then(m => m.LmClientModule),
    data: {
      permissions: [LoadPermission.lmClient]
    },
    canLoad: [PermissionsGuard],
  },
  {
    path: RB_LM_TASK,
    loadChildren: () => import('./lm-task/lm-task.module').then(m => m.LmTaskModule),
    data: {
      permissions: [LoadPermission.lmClient]
    },
    canLoad: [PermissionsGuard],

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
