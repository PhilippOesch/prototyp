import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import {path} from "@angular-devkit/core";
//declare ambisonics
declare const ambisonics;

export class Sound {

    /* Class Attributes*/
    context;
    source;
    encoder;
    binDecoder;
    summator;
    rotator

    //compass value
    heading;

    path: String;
    order: number;

    //Startpoint in degree
    startpoint: number;
    isPlaying = false;

    /*Constructor*/
    constructor(context, protected deviceOrientation: DeviceOrientation, path: String, order: number, startpoint: number, rotator, encoder ) {
        //this.encoder= encoder;
        this.context = context;
        this.source = this.context.createBufferSource();
        this.summator = this.context.createGain();
        this.path = path;
        this.order = order;
        this.startpoint = startpoint;
        this.rotator= rotator;
    }

    /*Methods*/
    play() {
        this.source.connect(this.encoder.in);
        this.encoder.out.connect(this.summator);
        this.source.start(0);
        this.isPlaying = false;
    }

    playloop(s = 0) {
        this.source.connect(this.encoder.in);
        this.encoder.out.connect(this.summator);
        this.source.loop = true;
        this.source.loopStart= 3;
        this.source.start(0);
        this.isPlaying = true;
    }

    stop() {
        this.source.stop();
    }

    loadSound() {
        const url: string = 'assets/sounds/' + this.path;
        fetch(url, {method: 'GET'}).then(response => response.arrayBuffer().
        then(
            buffer => {
                this.context.decodeAudioData(buffer, audioBuffer => { this.source.buffer = audioBuffer; }, url => {
                    console.log('Failed to load Sound file: ' + url); });
            }
        ));
    }

    init() {

        // Summing and routing of Audio Sources
        this.summator.connect(this.rotator.in);
        this.hoaEncoder(this.order, this.startpoint);

    }

    hoaEncoder(order: number, azim: number) {
        this.encoder= new ambisonics.monoEncoder(this.context, this.order);
        this.encoder.azim = -azim; // Horizontal Position
        // this.encoder.elev = this.elev; // Vertical Position
        this.encoder.updateGains();
        console.log(this.encoder);
    }

    //set Gain ...duh
    setGain(value){
        this.summator.gain.value= value;
        this.summator.connect(this.rotator.in);
        this.source.connect(this.summator);
    }
}