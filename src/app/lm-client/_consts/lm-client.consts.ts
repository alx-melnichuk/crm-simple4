import { RB_LM_CLIENT } from '../../_consts/app.consts';

export class Tracing {
  public static log(message?: any, ...optionalParams: any[]): void {
    console.log('%capp-client: ' + message, 'color: DodgerBlue; font-weight: bold', ...optionalParams);
  }
}

// The value of the microservice address for this entity.
export const HOST_API = '/api';

/*
 * const RB_* - Route branch.
 * const RP_* - Route parameter.
 * const RT_* - Route.
 */
export const RB_LIST = 'list';
// router - "/lm-client/list"
export const RT_LM_CLIENT_LIST = '/' + RB_LM_CLIENT + '/' + RB_LIST;

export const RB_VIEW = 'view';
export const RP_CLIENT_ID = 'clientId';
export const RB_VIEW_CLIENT_ID = RB_VIEW + '/:' + RP_CLIENT_ID;
// router - "/lm-client/view/:clientId"
export const RT_LM_CLIENT_VIEW_CLIENT_ID = '/' + RB_LM_CLIENT + '/' + RB_VIEW_CLIENT_ID;

// Permissions
export enum ClientPermission {
  clientList = 'clientList',
  clientView = 'clientView'
}
