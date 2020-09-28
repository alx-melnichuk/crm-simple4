import { Injectable } from '@angular/core';

import { ProfileDto } from '../_interfaces/profile-dto.interface';

const LM_CLIENT = 'lmClient';
const CLIENT_LIST = 'clientList';
const CLIENT_VIEW = 'clientView';
const LM_TASK = 'lmTask';
const TASK_LIST = 'taskList';
const TASK_VIEW = 'taskView';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public get profileDto(): ProfileDto {
    return this.cloneProfileDto(this.innProfileDto);
  }
  public set profileDto(value: ProfileDto) {}

  private innProfileDto: ProfileDto;

  constructor() {
    this.innProfileDto = this.create(1, 'Petrenko', 'Alexey', 'Ivanovich', 'user1',
      [LM_CLIENT, CLIENT_LIST, CLIENT_VIEW, LM_TASK, TASK_LIST, TASK_VIEW]);
  }

  // ** Public API **

  public availablePermissions(): string[] {
    return (this.innProfileDto != null ? this.innProfileDto.permissions : null);
  }

  // ** Private API **

  private cloneProfileDto(profileDto: ProfileDto): ProfileDto {
    return (profileDto == null ? null : Object.assign({}, profileDto));
  }

  private create(
    id: number, surname: string, name: string, patronymic: string, login: string, permissions: string[]
  ): ProfileDto {
    return { id, surname, name, patronymic, email: surname + '@crm-simple.ua', login, permissions };
  }
}
