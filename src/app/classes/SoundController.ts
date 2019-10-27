
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
    order= 4;
    loader_filters;
    initheading: number;

    rotator;
    decoder;

    constructor(protected deviceOrientation: DeviceOrientation, chapter: number) {
        this.soundMap = new Map();
        this.context = new AudioContext();
        //this.context = (window.AudioContext) ? new window.AudioContext : new window.webkitAudioContext;
        this.orientation = this.deviceOrientation;
        this.heading = 0;
        this.soundArray = json[chapter - 1];
        this.decoder = new ambisonics.binDecoder(this.context, this.order);
    }


//init just the Controller
initController() {

        var subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;

                //Update Rotation
                //this.rotator.yaw = this.heading;
                //this.rotator.updateRotMtx();
                //this.hoaEncoder(data.magneticHeading);
            },
        );
        
        // Binaural Decode
        //this.encoder = new ambisonics.monoEncoder(this.context, this.order);
        this.decoder = new ambisonics.binDecoder(this.context, this.order);

        //Rotator
        this.rotator = new ambisonics.sceneRotator(this.context, this.order);
        this.rotator.out.connect(this.decoder.in);
        
        this.decoder.out.connect(this.context.destination);
        this.decoder.resetFilters();
                

        this.loader_filters = new ambisonics.HRIRloader_ircam(this.context, this.order, (buffer)=> {
            console.log('successfully loaded HOA buffer:', buffer);
            console.log(this.decoder);
            this.decoder.updateFilters(buffer);
        });
        this.loader_filters.load("assets/IRs/IRC_1076_C_HRIR_44100.sofa.json");
        console.log(this.loader_filters);

        // Rotation
        this.initheading= this.heading;
        this.rotator.yaw = this.heading;
        this.rotator.updateRotMtx();
    }

//init all Sound for this Chapter
initSounds(){
        console.log(this.soundArray);
        
        //Init all Sounds inside Array
        for (let value of this.soundArray) {
            this.soundMap.set(value, new HRTFSound(this.context, this.orientation, value.name, value.order, value.startpoint, this.rotator));
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
                sound.playloop(3000);
            }
            else {
                sound.play();
            }
            console.log(this.soundArray[index].name + ' started playing');
        } else {

            // load the Sound and start playing it
            const value = this.soundArray[index];
            if(isHrtf){
                this.soundMap.set(value.name, new HRTFSound(this.context, this.orientation, value.name, value.order, value.startpoint, this.rotator));
            } else {
                this.soundMap.set(value.name, new Sound(this.context, this.orientation, value.name, value.order, value.startpoint, this.rotator));
            }
            const sound = this.soundMap.get(value.name);
            sound.init();
            sound.loadSound();
            if (this.soundArray[index].loop) {
                sound.playloop(3000);
            }
            else {
                sound.play();
            }
            console.log(this.soundArray[index].name + ' started playing.');
        }
    }

    //Stop Sound with index from json-File
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
            this.soundMap.set(index, new MultichannelSound(this.context, this.orientation, this.soundArray[index].name, this.soundArray[index].order,  this.setHeading(startpoint), this.rotator));
        } else if(typ=== "hrtf") {
            this.soundMap.set(index, new HRTFSound(this.context, this.orientation, this.soundArray[index].name, this.soundArray[index].order, this.setHeading(startpoint), this.rotator));
        } else {
            this.soundMap.set(index, new Sound(this.context, this.orientation, this.soundArray[index].name, this.soundArray[index].order, this.setHeading(startpoint), this.rotator));

        }
        const sound = this.soundMap.get(index);
        sound.init();
        sound.loadSound();

        //set the gain
        //sound.setGain(gain);
    }

    //adjust the heading accordingly for the proper sound position
    setHeading(startpoint){
        //for some reason everything is turned +180 degrees, dont know why 
        // return (startpoint+180)% 360;
        return (startpoint)% 360;
    }

    //Stop sll Sound currently playing
    stopAllSounds(){
        for (let value of this.soundArray) {
            if(this.soundMap.has(value)){
                this.stopSound(value);
            }
        }
    }

    // hoaEncoder(azim: number) {
    //     this.encoder.azim = azim; // Horizontal Position
    //     // this.encoder.elev = this.elev; // Vertical Position
    //     this.encoder.updateGains();
    //     console.log(this.encoder);
    // }
}
