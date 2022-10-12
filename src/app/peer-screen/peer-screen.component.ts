import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Peer from 'peerjs';

@Component({
  selector: 'app-peer-screen',
  templateUrl: './peer-screen.component.html',
  styleUrls: ['./peer-screen.component.scss']
})
export class PeerScreenComponent implements OnInit {

  myMediaStream?: MediaStream
  peerMediaStream?: MediaStream

  videoCheck: boolean = false
  audioCheck: boolean = false
  showMyOwn: boolean = false

  meAsPeer?: Peer
  otherPeerId?: string

  constructor(private route: ActivatedRoute) { }

  call() {
    if (!this.myMediaStream) {
      console.log("Media stream is not activated on this client")
      return
    }
    if (!this.meAsPeer) {
      console.log("This client does not have a set peer")
      return
    }
    if (!this.otherPeerId) {
      console.log("No ID of a peer is present")
      return
    }

    const call = this.meAsPeer.call(this.otherPeerId, this.myMediaStream)
    call.on("stream", (otherPeerStream) => {
      this.peerMediaStream = otherPeerStream
    })
    console.log("Connection established")
  }

  screenCapture(video: boolean = true, audio: boolean = false): Promise<MediaStream> {
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

  startRecording() {
    this.screenCapture(this.videoCheck, this.audioCheck)
      .then(mediaStream => {
        this.myMediaStream = mediaStream
      })
  }

  ngOnInit(): void {
    this.meAsPeer = new Peer({ host: "wp.1fs.us", port: 443, path: '/myapp', secure: true });
    this.meAsPeer.on("call", (call) => {
      console.log("My stream:", this.myMediaStream)
      call.answer(this.myMediaStream)
      call.on("stream", (stream => {
        this.peerMediaStream = stream
      }))
    })

    this.route.queryParamMap.subscribe(queries => {
      const peerIdQuery = queries.get("peer")
      if (peerIdQuery) {
        this.otherPeerId = peerIdQuery
      }
    })
  }
}
