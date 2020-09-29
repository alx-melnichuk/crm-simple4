import { RB_LM_TASK } from '../../_consts/app.consts';

export class Tracing {
  public static log(message?: any, ...optionalParams: any[]): void {
    console.log('%clm-task: ' + message, 'color: Green; font-weight: bold', ...optionalParams);
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
// router - "/lm-task/list"
export const RT_LM_TASK_LIST = '/' + RB_LM_TASK + '/' + RB_LIST;

export const RB_VIEW = 'view';
export const RP_TASK_ID = 'taskId';
export const RB_VIEW_TASK_ID = RB_VIEW + '/:' + RP_TASK_ID;
// router - "/lm-task/view/:taskId"
export const RT_LM_TASK_VIEW_TASK_ID = '/' + RB_LM_TASK + '/' + RB_VIEW_TASK_ID;

// Permissions
export enum TaskPermission {
  taskList = 'taskList',
  taskView = 'taskView'
}
