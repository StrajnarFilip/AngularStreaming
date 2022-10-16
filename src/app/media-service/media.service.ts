import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor() { }

  public GetDeviceStream(
    video: boolean = true,
    audio: boolean = false
  ): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({
      video: video ? {
        frameRate: 60,
        height: 20_000,
        width: 20_000
      } : false,
      audio: audio ? {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      } : false
    })
  }

  public GetScreenShareStream(
    video: boolean = true,
    audio: boolean = false
  ): Promise<MediaStream> {
    return navigator.mediaDevices.getDisplayMedia({
      video: video ? {
        frameRate: 60,
        height: 20_000,
        width: 20_000
      } : false,
      audio: audio ? {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
      } : false
    })
  }
}
