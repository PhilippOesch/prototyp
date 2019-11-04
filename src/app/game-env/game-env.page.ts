import { Component, OnInit} from '@angular/core';
import { SoundController } from '../classes/SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-game-env',
  templateUrl: './game-env.page.html',
  styleUrls: ['./game-env.page.scss'],
})
export class GameEnvPage implements OnInit {
  overlayHidden = true;

  soundController;
  monkeyPos= 0;
  heading= 0;
  points= 0;
  monkeyTyp= 1;

  monkeySound: any;
  intervalSpawn;

  //for timer
  intervalTimer;
  timeleft= 90;
  isPaused=false;

  constructor(protected deviceOrientation: DeviceOrientation, private vibration: Vibration, public platform: Platform) {
    platform.ready().then(() => {
      //pause when tapping out of app
      this.platform.pause.subscribe(() => {
        this.pauseGame();
        console.log("pause");
      });

      //continue when tapping into app
      this.platform.resume.subscribe(() => {
        this.unpauseGame();
        console.log("continue");
      });
    });
   }

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
  }

  ionViewDidEnter(){
    //Init Sound Controller
    this.soundController = new SoundController (this.deviceOrientation, 2);
    this.soundController.initController();

    //start Athmo
    this.soundController.initSound(0, 0, "multi", 0.3);
    this.soundController.playSound(0);


    this.intervalSpawn = setInterval(() =>{
      if(!this.isPaused){
        this.soundController.stopSound( this.monkeyTyp);
        this.spawnMonkey();
      }
    }, 10000)

    this.intervalTimer = setInterval(() => {
      if(!this.isPaused){
        this.timeleft = this.timeleft - 1;
        console.log(this.timeleft);
        if(this.timeleft === 0){ 
          clearInterval(this.intervalTimer);
          clearInterval(this.intervalSpawn);
          this.soundController.stopSound( this.monkeyTyp);
          this.soundController.stopSound( 0);
          this.showOverlay();
        }
      }
    }, 1000);
  }

  spawnMonkey(){
    const random= Math.floor((Math.random() * 360) + 0);
    let ramdomtyp= Math.floor((Math.random() * 3) + 1); 
    while(ramdomtyp== this.monkeyTyp){
      ramdomtyp= Math.floor((Math.random() * 3) + 1); 
    }
    this.monkeyTyp= ramdomtyp;
    this.soundController.initSound(this.monkeyTyp, random, 'hrtf');
    this.monkeyPos= random;
    this.monkeySound= this.getMonkeySound(this.monkeyTyp);
    this.soundController.playSound(this.monkeyTyp, true);
    
  }

  catchMonkey(){
    const currentPos= this.heading;
    if(this.monkeyPos+5 >=currentPos && this.monkeyPos-5 <=currentPos && this.soundController.soundMap.has(this.monkeyTyp))
    {       
      this.points++;
      this.vibration.vibrate(1000);
      this.soundController.stopSound( this.monkeyTyp);
    }
  }

  getMonkeySound(index){
    return this.soundController.soundMap.get(index);
  }

  endGame(){
    this.soundController.stopAllSounds();
  }

  public showOverlay() {
    this.overlayHidden = false;
  }

  pauseGame = () =>{
    //suspends Audiocontext
    this.soundController.context.suspend().then(() => {
      this.isPaused=true;
      console.log(this.isPaused);
    });
  };

  unpauseGame = () => {
    this.soundController.context.resume().then(() => {
      this.isPaused=false;
    });
  };

}
