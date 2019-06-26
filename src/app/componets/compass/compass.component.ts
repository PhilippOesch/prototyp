import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss'],
})
export class CompassComponent implements OnInit {
  @Input() heading: number;

  constructor() { }

  ngOnInit() {}

}
