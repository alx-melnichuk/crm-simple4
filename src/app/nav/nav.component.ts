import { Component, OnInit, Input } from '@angular/core';

import { NavItem } from './nav.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input()
  public navList: NavItem[];

  constructor() { }

  ngOnInit(): void {
  }

  trackById(index: number, item: NavItem): string {
    return String(item.id);
  }
}
