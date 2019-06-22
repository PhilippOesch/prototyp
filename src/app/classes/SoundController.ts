import { Sound } from './Sound';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import json from '../../assets/json/sound.json';

// TODO: Need a lot of work. Don't know what to say.

export class SoundController {

    soundMap: Map<string, any>;
    context;
    orientation: DeviceOrientation;
    soundArray: [];
    heading: number;
    constructor(protected deviceOrientation: DeviceOrientation, chapter: number) {
        this.soundMap = new Map();
        this.context = (window.AudioContext) ? new window.AudioContext : new window.webkitAudioContext;
        this.orientation = this.deviceOrientation;
        this.heading = 0;
        this.soundArray = json[chapter - 1];
    }


init() {
        console.log('Sound Array loaded from JSON: ' + this.soundArray);

        // Init all Sounds inside Array
        for (let value of this.soundArray) {
            this.soundMap.set(value.name, new Sound(this.context, this.orientation, value.name, value.order, value.startpoint));
            const sound = this.soundMap.get(value.name);
            sound.init();
            sound.loadSound();
        }

        // Device Orientation
        this.deviceOrientation.getCurrentHeading().then(
            (data: DeviceOrientationCompassHeading) => this.heading = data.magneticHeading,
            (error: any) => console.log(error)
        );

        // Watch Device Orientation
        const subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;
            },
        );
    }

    playSound(index: number) {
        if (this.soundMap.has(this.soundArray[index].name) && this.soundMap.get(this.soundArray[index].name).isPlaying) {
            // Sound is already playing
            console.log('sound is already playing');
        } else if (this.soundMap.has(this.soundArray[index].name)) {

            // Start playing the Sound
            const sound = this.soundMap.get(this.soundArray[index].name);
            if (sound.loop) {
                sound.playloop();
            }
            else {
                sound.play();
            }
            console.log(this.soundArray[index].name + ' started playing');
        } else {

            // load the Sound and start playing it
            const value = this.soundArray[index];
            this.soundMap.set(value.name, new Sound(this.context, this.orientation, value.name, value.order, value.startpoint));
            const sound = this.soundMap.get(value.name);
            sound.init();
            sound.loadSound();
            if (sound.loop) {
                sound.playloop();
            }
            else {
                sound.play();
            }
            console.log(this.soundArray[index].name + ' started playing.');
        }
    }

    stopSound(index: number) {

        // Check if sound is inside the Map
        if (this.soundMap.has(this.soundArray[index].name)) {

            // Stop playing Sound
            const sound = this.soundMap.get(this.soundArray[index].name);
            sound.stop();

            // delete Sound from Map
            this.soundMap.delete(this.soundArray[index].name);

            console.log('Sound deactivated');
        } else {

            // Sound is not inside Map
            console.log('Sound already deactivated');
        }
    }
}