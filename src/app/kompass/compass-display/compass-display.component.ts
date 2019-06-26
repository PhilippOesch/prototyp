import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-compass-display',
  templateUrl: './compass-display.component.html',
  styleUrls: ['./compass-display.component.scss'],
})
export class CompassDisplayComponent implements OnInit {
  @Input() heading: number;

  constructor() { }

  ngOnInit() {}

}
