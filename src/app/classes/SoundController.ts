
//Custom Classes
import { Sound } from './Sound';
import { HRTFSound } from './HRTFSound';
import { MultichannelSound } from './MultichannelSound';

import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';

/* needed that for building apk directly on Smartphone */
import { AudioContext, OfflineAudioContext } from 'standardized-audio-context';
import json from '../../assets/json/sound.json';

// TODO: Need a lot of work. Don't know what to say.
//declare ambisonics
declare const ambisonics;

export class SoundController {

    soundMap: Map<number, any>;
    context;
    orientation: DeviceOrientation;
    soundArray: any;
    heading: number;
    rotator;
    encoder
    order= 3;
    loader_filters;
    binDecoder;
    initheading: number;

    constructor(protected deviceOrientation: DeviceOrientation, chapter: number) {
        this.soundMap = new Map();
        this.context = new AudioContext();
        //this.context = (window.AudioContext) ? new window.AudioContext : new window.webkitAudioContext;
        this.orientation = this.deviceOrientation;
        this.heading = 0;
        this.soundArray = json[chapter - 1];
    }


//init just the Controller
initController() {
        
        //Device Orientation
        this.deviceOrientation.getCurrentHeading().then(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;
                this.initheading= data.magneticHeading;
            },
            (error: any) => console.log(error)
        );

        var subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;

                //Update Rotation
                this.rotator.yaw = this.heading;
                this.rotator.updateRotMtx();
            },
        );
        
        // Binaural Decode
        this.encoder = new ambisonics.monoEncoder(this.context, this.order);
        this.binDecoder = new ambisonics.binDecoder(this.context, this.order);

        //Rotator
        this.rotator = new ambisonics.sceneRotator(this.context, this.order);
        this.rotator.out.connect(this.binDecoder.in);
        
        this.binDecoder.out.connect(this.context.destination);
        this.binDecoder.resetFilters();

        this.loader_filters = new ambisonics.HRIRloader_ircam(this.context, this.order, (buffer)=> {
            console.log('successfully loaded HOA buffer:', buffer);
            console.log(this.binDecoder);
            this.binDecoder.updateFilters(buffer);
        });
        this.loader_filters.load("assets/IRs/IRC_1076_C_HRIR_44100.sofa.json");
        console.log(this.loader_filters);

        // Rotation
        this.initheading= this.heading;
        this.rotator.yaw = this.heading;
        this.rotator.updateRotMtx();
    }

//init all Sound for this Page
initSounds(){
        console.log(this.soundArray);
        
        //Init all Sounds inside Array
        for (let value of this.soundArray) {
            this.soundMap.set(value, new HRTFSound(this.context, this.orientation, value.name, value.order, value.startpoint, this.rotator, this.encoder));
            const sound = this.soundMap.get(value);
            sound.init();
            sound.loadSound();
        }
    }

    playSound(index: number, isHrtf= false) {
        if (this.soundMap.has(index) && this.soundMap.get(index).isPlaying) {
            // Sound is already playing
            console.log('sound is already playing');
        } else if (this.soundMap.has(index)) {

            // Start playing the Sound
            const sound = this.soundMap.get(index);
            if (this.soundArray[index].loop) {
                sound.playloop();
            }
            else {
                sound.play();
            }
            console.log(this.soundArray[index].name + ' started playing');
        } else {

            // load the Sound and start playing it
            const value = this.soundArray[index];
            if(isHrtf){
                this.soundMap.set(value.name, new HRTFSound(this.context, this.orientation, value.name, value.order, value.startpoint, this.rotator, this.encoder));
            } else {
                this.soundMap.set(value.name, new Sound(this.context, this.orientation, value.name, value.order, value.startpoint, this.rotator, this.encoder));
            }
            const sound = this.soundMap.get(value.name);
            sound.init();
            sound.loadSound();
            if (this.soundArray[index].loop) {
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
        if (this.soundMap.has(index)) {

            // Stop playing Sound
            const sound = this.soundMap.get(index);
            if(sound.isPlaying){
                sound.stop();
            }
            // sound.stop();

            // delete Sound from Map
            this.soundMap.delete(index);

            console.log('Sound deactivated');
        } else {

            // Sound is not inside Map
            console.log('Sound already deactivated');
        }
    }

    //init one specific sound
    initSound(index, startpoint= 0, typ= "", gain= 1){
        //check Sound-Type
        if(typ=== "multi"){
            this.soundMap.set(index, new MultichannelSound(this.context, this.orientation, this.soundArray[index].name, this.soundArray[index].order, this.setHeading(startpoint), this.rotator, this.encoder));
        } else if(typ=== "hrtf") {
            this.soundMap.set(index, new HRTFSound(this.context, this.orientation, this.soundArray[index].name, this.soundArray[index].order, this.setHeading(startpoint), this.rotator, this.encoder));
        } else {
            this.soundMap.set(index, new Sound(this.context, this.orientation, this.soundArray[index].name, this.soundArray[index].order, this.setHeading(startpoint), this.rotator, this.encoder));

        }
        const sound = this.soundMap.get(index);
        sound.init();

        //set the gain
        // sound.setGain(gain);

        sound.loadSound();
    }

    setHeading(startpoint){
        //Wert zwischen 0 und 360
        return(this.initheading+ startpoint)% 360;
        //return startpoint;
    }

    stopAllSounds(){
        for (let value of this.soundArray) {
            if(this.soundMap.has(value)){
                this.stopSound(value);
            }
        }
    }
}
