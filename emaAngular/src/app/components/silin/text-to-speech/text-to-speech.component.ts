import { Component } from '@angular/core';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent {
  text: string=" ";
  emptyMessage: string="";
  socket:any;
  path: string = "";

  constructor() {
    this.socket = io();
  }

  ngOnInit() {
    this.socket.on('converted', (path: string) => {
      console.log('Received path:', path);
      this.path = path;
    })
  };
    

  convert() {
    if (this.text == "") {
      this.emptyMessage = "Please enter some text to convert";
      return;
    }
    this.emptyMessage = "";
    this.socket.emit('convert', {text: this.text});
  }

}
