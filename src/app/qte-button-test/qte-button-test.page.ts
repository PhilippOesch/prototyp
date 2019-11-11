import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-qte-button-test',
  templateUrl: './qte-button-test.page.html',
  styleUrls: ['./qte-button-test.page.scss'],
})
export class QteButtonTestPage implements OnInit {
  animationTime = '20s';

  constructor() { }

  ngOnInit() {
  }
  onClickHandler() {
    console.log('Jeff');
  }
}
