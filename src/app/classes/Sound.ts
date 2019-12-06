import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation/ngx';
import {path} from "@angular-devkit/core";
//declare ambisonics
declare const ambisonics;

export class Sound {

    /* Class Attributes*/
    context;
    source;
    encoder;
    decoder;
    summator;
    rotator
    subscription;


    //compass value
    heading;

    path: String;
    order: number;

    //Startpoint in degree
    startpoint: number;
    isPlaying = false;

    /*Constructor*/
    constructor(context, protected deviceOrientation: DeviceOrientation, path: String, order: number, startpoint: number, rotator) {
        //this.encoder= encoder;
        this.context = context;                             //Audio Context
        this.source = this.context.createBufferSource();    
        this.summator = this.context.createGain();          //Gain
        this.path = path;
        this.order = order;                                 //Max Order
        this.heading= 0;
        this.startpoint = startpoint;                       //Position relativ to Starting-Pos
        this.encoder = new ambisonics.monoEncoder(this.context, this.order);
        this.rotator = rotator;

        this.subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;

                //Update Rotation
                this.hoaEncoder((data.magneticHeading-startpoint)%360);

                //this.rotator.yaw = this.heading;
                //this.rotator.updateRotMtx();
            },
        );
    }

    /*Methods*/
    play() {
        //this.source.connect(this.encoder.in);
        //this.encoder.out.connect(this.summator);
        this.source.connect(this.encoder.in);
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
                this.context.decodeAudioData(buffer, audioBuffer => 
                    { 
                        this.source.buffer= audioBuffer; 
                        //console.log(audioBuffer);
                    });
                }
        ));

        // fetch(url, {method: 'GET'}).then(response => response.arrayBuffer().
        // then(
        //     buffer => {
        //         this.context.decodeAudioData(buffer, audioBuffer => { this.source.buffer = audioBuffer;}, url => {
        //             console.log('Failed to load Sound file: ' + url); });
        //     }
        // ));

    }

    init() {

        // Summing and routing of Audio Sources
        this.summator.connect(this.rotator.in);
        //console.log(this.source.buffer);
        //this.hoaEncoder(this.order, this.startpoint);

    }

    //Set the Sounds position
    hoaEncoder(azim: number) {
        this.encoder.azim = azim; // Horizontal Position
        // this.encoder.elev = this.elev; // Vertical Position
        this.encoder.updateGains();
        console.log(this.encoder);
    }

    //set Gain
    setGain(value){
        this.summator.gain.value= value;
        this.summator.connect(this.rotator.in);
        this.source.connect(this.summator);
    }
}