import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-capture',
  templateUrl: './screen-capture.component.html',
  styleUrls: ['./screen-capture.component.scss']
})
export class ScreenCaptureComponent implements OnInit {
  media?: MediaStream

  videoCheck: boolean = false
  audioCheck: boolean = false

  constructor() { }

  startRecording() {

    this.screenCapture(this.videoCheck, this.audioCheck)
      .then(mediaStream => {
        this.media = mediaStream
      })
  }

  screenCapture(video: boolean = true, audio: boolean = false): Promise<MediaStream> {
    return navigator.mediaDevices.getDisplayMedia({
      video: video ? {
        frameRate: 60,
      } : false,
      audio: audio ? {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      } : false
    })
  }

  ngOnInit(): void {

  }

}
