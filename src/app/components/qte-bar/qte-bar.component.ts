import { Component, OnInit, Input, DefaultIterableDiffer } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-qte-bar',
  templateUrl: './qte-bar.component.html',
  styleUrls: ['./qte-bar.component.scss'],
})
export class QteBarComponent implements OnInit {
  @Input() decision1='';
  @Input() decision1Link='';
  @Input() defaultLink='';
  @Input() timerLength=5;

  constructor(private router: Router) {
   }

  ngOnInit() {
    setTimeout(this.redirectToDefault, ((this.timerLength+0.7)*1000));

  }

  redirectToDefault = () => {this.router.navigate([this.defaultLink]); };

  getTimerDelay(extraDelay: number){
    return (this.timerLength+ extraDelay) + 's';
  }

  getAnimationDur(){
    return this.timerLength+'s';
  }

  getQTEBackroundDuration(){
    return  '0.2s, 1s';
  }

  getQTEBackroundDelay(){
    return this.timerLength + 's , ' + (this.timerLength + 0.5) + 's';
  }
}
