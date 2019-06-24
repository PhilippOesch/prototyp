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
  randomPos;
  heading= 0;

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

    //generate random value (0-360) and create Bineural Sound at that Position
    this.randomPos= Math.floor((Math.random() * 360) + 0);
    this.soundController.initSound(0, this.randomPos, 'hrtf', 0.5);
    this.soundController.playSound(0);
  }

}
