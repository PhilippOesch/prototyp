import { Component, OnInit, Input, DefaultIterableDiffer} from '@angular/core';

@Component({
  selector: 'app-qte',
  templateUrl: './qte.component.html',
  styleUrls: ['./qte.component.scss'],
})
export class QteComponent implements OnInit {
  @Input() decision1='';
  @Input() decision1Link='';
  @Input() decision2='';
  @Input() decision2Link='';
  @Input() defaultLink='';
  @Input() timerLength=5;

  constructor() {
   }

  ngOnInit() {

  }

}
