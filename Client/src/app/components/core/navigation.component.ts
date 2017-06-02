import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-nav',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ],
  providers: [ Location ]
})
export class NavigationComponent  {

  constructor(location: Location) {}

  isActive(pathname: string): boolean {
    let currentPathname = location.pathname;
    return currentPathname === pathname;
  }
}
