import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-capture',
  templateUrl: './camera-capture.component.html',
  styleUrls: ['./camera-capture.component.scss']
})
export class CameraCaptureComponent implements OnInit {

  media?: MediaStream

  videoCheck: boolean = false
  audioCheck: boolean = false

  constructor() { }

  startRecording() {
    this.getCamera(this.videoCheck, this.audioCheck).then(mediaStream => {
      this.media = mediaStream
    })
  }

  getCamera(video: boolean = true, audio: boolean = false) {
    return navigator.mediaDevices.getUserMedia({
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
