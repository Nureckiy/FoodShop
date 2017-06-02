import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements  OnInit {

  @Input('background-image') backgroundImage: string;
  @Input() big: boolean;
  @Input() subtitle: string;
  @Input() title: string;

  className: string;

  ngOnInit(): void {
    if (!this.backgroundImage) {
      this.backgroundImage = 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1487340138/fon1_gex8nh.jpg';
    }
    if (!this.big) {
      this.className = 'cut';
    }
  }
}
