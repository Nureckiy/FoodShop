import { Component } from '@angular/core';


@Component({
  selector: 'app-loader',
  template: `<img src="../../../src/assets/images/loader.gif"/>`,
  styles: [`
    img {
      display: block;
      margin: 0 auto;
    }
  `]
})
export class LoaderComponent { }
