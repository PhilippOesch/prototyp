import { Component, OnInit } from '@angular/core';
import { SoundController } from '../classes/SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

@Component({
  selector: 'app-game-static',
  templateUrl: './game-static.page.html',
  styleUrls: ['./game-static.page.scss'],
})
export class GameStaticPage implements OnInit {
  soundController;
  constructor(private deviceOrientation: DeviceOrientation) { }

  ngOnInit() {
    this.soundController = new SoundController (this.deviceOrientation, 'sound.json');
  }

}
