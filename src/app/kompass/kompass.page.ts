import { Component, OnInit} from '@angular/core';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';


@Component({
  selector: 'app-kompass',
  templateUrl: './kompass.page.html',
  styleUrls: ['./kompass.page.scss'],
})
export class KompassPage implements OnInit {
  heading : number = 0;

  constructor(private deviceOrientation: DeviceOrientation) { }

  ngOnInit() {
    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => this.heading= data.magneticHeading,
     (error: any) => console.log(error)
   );

   var subscription = this.deviceOrientation.watchHeading().subscribe(
    (data: DeviceOrientationCompassHeading) => this.heading= data.magneticHeading,
    );
  }

}
