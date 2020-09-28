
export class Tracing {
  public static log(message?: any, ...optionalParams: any[]): void {
    console.log('%cmain: ' + message, 'color: Grey; font-weight: bold; font-style: italic;', ...optionalParams);
  }
}

// Permissions regulating the loading of domain modules.
export enum LoadPermission {
  lmClient = 'lmClient',
  lmTask = 'lmTask'
}

// Route:
export const RB_LM_CLIENT = 'lm-client';
export const RB_LM_TASK = 'lm-task';
