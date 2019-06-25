import { Component, OnInit} from '@angular/core';
import { SoundController } from '../classes/SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

@Component({
  selector: 'app-game-env',
  templateUrl: './game-env.page.html',
  styleUrls: ['./game-env.page.scss'],
})
export class GameEnvPage implements OnInit {
  soundController;
  monkeyPos;
  heading= 0;
  points= 0;
  monkeyTyp= 1;

  monkeySound: any;

  //for timer
  interval;

  constructor(protected deviceOrientation: DeviceOrientation) { }

  ngOnInit() {

    //Device Orientation
    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {
          this.heading = data.magneticHeading;
      },
      (error: any) => console.log(error)
    );

    // Watch Device Orientation
    const subscription = this.deviceOrientation.watchHeading().subscribe(
        (data: DeviceOrientationCompassHeading) => {
            this.heading = data.magneticHeading;
        },
    );

    //Init Sound Controller
    this.soundController = new SoundController (this.deviceOrientation, 2);
    this.soundController.initController();

    //start Athmo
    this.soundController.initSound(0, 0, "multi");
    this.soundController.playSound(0);

    //generate random value (0-360) and create Bineural Sound at that Position
    setInterval(() =>{
      this.soundController.stopSound( this.monkeyTyp)
      this.spawnMonkey();
    }, 10000)

  }

  spawnMonkey(){
    const random= Math.floor((Math.random() * 360) + 0);
    let ramdomtyp= Math.floor((Math.random() * 3) + 1); 
    while(ramdomtyp== this.monkeyTyp){
      ramdomtyp= Math.floor((Math.random() * 3) + 1); 
    }
    this.monkeyTyp= ramdomtyp;
    this.monkeyPos= random;
    this.soundController.initSound(this.monkeyTyp, random, 'hrtf');
    this.monkeySound= this.getMonkeySound(this.monkeyTyp);
    this.soundController.playSound(this.monkeyTyp, true);
    
  }

  catchMonkey(){
    const currentPos= this.heading;
    if(this.monkeyPos+5 >=currentPos && this.monkeyPos-5 <=currentPos)
    {
      this.points++;
    }
  }

  getMonkeySound(index){
    return this.soundController.soundMap.get(this.soundController.soundArray[index].name)
  }


}
