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
    rotator;

    //compass value
    heading;

    path: String;
    order: number;

    //Startpoint in degree
    startpoint: number;
    isPlaying = false;

    /*Constructor*/
    constructor(context, protected deviceOrientation: DeviceOrientation, path: String, order: number, startpoint: number ) {
        this.context = context;
        this.source = this.context.createBufferSource();
        this.summator = this.context.createGain();
        this.path = path;
        this.order = order;
        this.startpoint = startpoint;
    }

    /*Methods*/
    play() {
        this.source.connect(this.encoder.in);
        this.encoder.out.connect(this.summator);
        this.source.start(0);
        this.isPlaying = true;
    }

    playloop() {
        this.source.connect(this.encoder.in);
        this.encoder.out.connect(this.summator);
        this.source.loop = true;
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
        // Initiate Device Orientation
        this.deviceOrientation.getCurrentHeading().then(
            (data: DeviceOrientationCompassHeading) => this.heading = data.magneticHeading,
            (error: any) => console.log(error)
        );

        // Rotation
        this.rotator = new ambisonics.sceneRotator(this.context, this.order);
        const angleInDegrees = this.startpoint;
        this.rotator.yaw = angleInDegrees;
        this.rotator.updateRotMtx();

        // Binaural Decoder
        this.binDecoder = new ambisonics.binDecoder(this.context, this.order);
        this.binDecoder.resetFilters();

        // Summing and routing of Audio Sources
        this.summator.connect(this.rotator.in);
        this.rotator.out.connect(this.binDecoder.in);
        this.binDecoder.out.connect(this.context.destination);

        this.hoaEncoder(this.order, this.startpoint);

        // Watch Device Orientation
        var subscription = this.deviceOrientation.watchHeading().subscribe(
            (data: DeviceOrientationCompassHeading) => {
                this.heading = data.magneticHeading;

                //Update Rotation
                this.rotator.yaw = 360-this.heading;
                this.rotator.updateRotMtx();
            },
        );
    }

    hoaEncoder(order: number, azim: number) {
        this.encoder = new ambisonics.monoEncoder(this.context, order);
        this.encoder.azim = azim; // Horizontal Position
        // this.encoder.elev = this.elev; // Vertical Position
        this.encoder.updateGains();
        console.log(this.encoder);
    }

    //set Gain ...duh
    setGain(value){
        this.summator.gain.value= value;
        this.summator.connect(this.context.destination);
        this.source.connect(this.summator);
    }
}
