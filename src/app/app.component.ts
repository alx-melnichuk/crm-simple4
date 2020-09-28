import { Component, OnInit } from '@angular/core';
import { NavItem } from './nav/nav.interface';

import { ProfileService } from './_services/profile.service';

const LM = 'lm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'CRM-simple';
  public navItemList: NavItem[];

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.navItemList = this.createNavItemByPermissions(this.profileService.availablePermissions());
  }

  // ** Private API **

  private createNavItemByPermissions(permissions: string[]): NavItem[] {
    const result: NavItem[] = [];
    const permissionList: string[] = (permissions || [])
      .filter((item) => !!item && item.startsWith(LM));
    const lenLM = LM.length;
    let idx = 0;
    for (const permission of permissionList) {
      if (permission != null && permission.length > lenLM) {
        const name = permission.substring(lenLM);
        result.push({ id: ++idx, name, routerLink: LM + '-' + name.toLowerCase(), permission });
      }
    }
    return result;
  }

}
