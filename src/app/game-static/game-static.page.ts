import { Component, OnInit } from '@angular/core';
import { SoundController } from '../classes/SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-game-static',
  templateUrl: './game-static.page.html',
  styleUrls: ['./game-static.page.scss'],
})
export class GameStaticPage implements OnInit {
  soundController;
  loaderToShow;

  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController) { }

  ngOnInit() {
    this.soundController = new SoundController (this.deviceOrientation, 1);
    this.showAutoHideLoader();
  }

  showAutoHideLoader() {
    this.loadingController.create({
      message: 'This Loader Will Auto Hide in 2 Seconds',
      duration: 2000
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds');
      });
    });
  }
}
