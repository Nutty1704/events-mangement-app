import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {
  socket: any;
  text: string = "";
  target: string = "French";

  emptyMessage: string = ""

  results: any[] = [];

  binding: any = {
    "French": "fr",
    "German": "de",
    "Dutch": "nl"
  };

  constructor() {
    this.socket = io();
  }

  ngOnInit() {
    this.socket.on('translated', (translation: string) => {
      this.results.push({text: this.text, target: this.target, translation: translation});
    })
  }

  chooseFrench() {
    this.target = "French";
  }

  chooseGerman() {
    this.target = "German";
  }

  chooseDutch() {
    this.target = "Dutch";
  }

  translate() {
    if (this.text == "") {
      this.emptyMessage = "Please enter some text to translate";
      return;
    }
    this.emptyMessage = "";
    this.socket.emit('translate', {text: this.text, target: this.binding[this.target]});
  }

}
