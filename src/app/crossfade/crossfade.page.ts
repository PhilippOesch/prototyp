import { Component, OnInit } from '@angular/core';
import { SoundControllerScene } from '../classes/SoundControllerScene';
import { timer } from 'rxjs';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-crossfade',
  templateUrl: './crossfade.page.html',
  styleUrls: ['./crossfade.page.scss'],
})
export class CrossfadePage implements OnInit {
  soundController;
  heading;

  constructor(protected deviceOrientation: DeviceOrientation, public loadingController: LoadingController) { }

  ngOnInit() {
    this.soundController= new SoundControllerScene(this.deviceOrientation, 3);
    this.soundController.initController();
    this.soundController.initSound(0, 0, "multi", 1.0);
    this.soundController.initSound(1, 0, "multi", 0.0);
    this.soundController.playSound(0);

    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {
          this.heading = data.magneticHeading;
      },
      (error: any) => console.log(error)
    );
    this.sceneLoading();
  }

  async sceneLoading() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Loading Scene',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();      //called when Loader is shown
    await loading.onDidDismiss(); //called when Loader is Dismissed
    
    this.startcrossfade();
  }

  startcrossfade(){
    this.soundController.playSound(1);
    this.soundController.crossfade(0, 1, 50);
  }
}
