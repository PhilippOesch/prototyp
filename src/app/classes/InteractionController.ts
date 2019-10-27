import { SoundController } from './SoundController';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

declare const ambisonics;

export class InteractionController {
    soundController;
    chapter;

    constructor(protected deviceOrientation: DeviceOrientation, chapter: number, soundController: SoundController) {
        this.soundController= soundController;
        this.chapter= chapter;
    }

    startInteraction(){

    }
}