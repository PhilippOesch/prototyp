import { Component, OnInit, Input} from '@angular/core';
//import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-compass-pointer',
  templateUrl: './compass-pointer.component.html',
  styleUrls: ['./compass-pointer.component.scss'],
})
export class CompassPointerComponent implements OnInit {
  @Input() heading: number;

  constructor() {
  }

  ngOnInit() {

  }

}
