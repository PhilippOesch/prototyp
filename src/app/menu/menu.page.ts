import { Component, OnInit } from '@angular/core';
import { StaticAudio } from '../classes/StaticAudio';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor() { }
  ngOnInit() {
    const titleSound = new StaticAudio('../assets/music/title_music.mp3', .5, true);
    titleSound.play();
  }



}
