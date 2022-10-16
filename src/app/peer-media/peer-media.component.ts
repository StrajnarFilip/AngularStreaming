import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Peer, { DataConnection } from 'peerjs';
import { MediaService } from '../media-service/media.service';

@Component({
  selector: 'app-peer-media',
  templateUrl: './peer-media.component.html',
  styleUrls: ['./peer-media.component.scss']
})
export class PeerMediaComponent implements OnInit {

  myMediaStream?: MediaStream
  peerMediaStream?: MediaStream

  videoCheck: boolean = false
  audioCheck: boolean = true
  showMyOwn: boolean = false
  connected: boolean = false

  meAsPeer?: Peer
  otherPeerId?: string

  constructor(private route: ActivatedRoute, private media: MediaService) { }

  connect() {
    if (!this.meAsPeer) {
      console.log("This client does not have a set peer")
      return
    }
    if (!this.otherPeerId) {
      console.log("No ID of a peer is present")
      return
    }

    if (!this.connected) {
      this.establishConnection(this.meAsPeer, this.otherPeerId)
    }

    if (this.myMediaStream) {
      this.startStreaming(this.meAsPeer, this.otherPeerId, this.myMediaStream)
    }
  }

  startStreaming(meAsPeer: Peer, otherPeerId: string, myMediaStream: MediaStream) {
    const call = meAsPeer.call(otherPeerId, myMediaStream)
    console.log("Calling object", call)
    call.on("stream", (otherPeerStream) => {
      this.connected = call.open
      this.peerMediaStream = otherPeerStream
    })
  }

  startRecording() {
    this.media.GetDeviceStream(this.videoCheck, this.audioCheck)
      .then(mediaStream => {
        // When user select mediaStream, set
        // it as the stream of this client
        this.myMediaStream = mediaStream
        // If connection is already established,
        // also start streaming it
        if (this.connected && this.meAsPeer && this.otherPeerId) {
          this.startStreaming(this.meAsPeer, this.otherPeerId, mediaStream)
        }
      })
  }

  establishConnection(meAsPeer: Peer, otherPeerId: string) {
    // First try to connect to peer
    const dataConnection = meAsPeer.connect(otherPeerId)
    console.log("DATACONN", dataConnection)
    dataConnection.on("open", () => {
      // When connection is opened successfully add following handler:
      dataConnection.on("data", (data) => {
        if (data == "ack") {
          // When "ack" message is received, update connected status
          this.connected = dataConnection.open
        }
      })
    })
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queries => {
      // Extract other peer's ID from query if present
      const peerIdQuery = queries.get("peer")
      if (peerIdQuery) {
        this.otherPeerId = peerIdQuery
      }
      // Extract this client's ID from query if present
      const myOwnId = queries.get("myid")
      this.createPeerForThisClient(myOwnId)

      this.handleCallStream()
      this.handleNewConnectionOpen()
    })
  }

  createPeerForThisClient(myOwnId: string | null) {
    this.meAsPeer = myOwnId ?
      new Peer(myOwnId, { host: "wp.1fs.us", port: 443, path: '/myapp', secure: true }) :
      new Peer({ host: "wp.1fs.us", port: 443, path: '/myapp', secure: true })
  }

  handleCallStream() {
    if (this.meAsPeer) {
      this.meAsPeer.on("call", (call) => {
        // Answer with this client's media stream
        console.log("Call connection", call)
        call.answer(this.myMediaStream)

        // When receiving a stream, assign it to peer's media stream
        call.on("stream", (stream => {
          console.log("Gotten stream", stream)
          this.peerMediaStream = stream
        }))

        call.on("error", (error) => {
          console.error("Stream error!", error)
          this.peerMediaStream = undefined
        })

        call.on("close", () => {
          console.error("Stream closed!")
          this.peerMediaStream = undefined
        })
      })
    }
  }

  handleNewConnectionOpen() {
    if (this.meAsPeer) {
      this.meAsPeer.on("connection", (connection) => {
        // Whenever there is a new connection, add the following handler
        connection.on("open", () => {
          // Whenever connection is open, update 
          // connected status and other peer's ID
          this.connected = connection.open
          this.otherPeerId = connection.peer
          // Also send an "ack" message
          connection.send("ack")
        })
      })
    }
  }

  linkToClipboard() {
    if (this.meAsPeer) {
      const protocol = window.location.protocol
      const hostName = window.location.hostname
      const port = window.location.port
      const path = window.location.pathname
      navigator.clipboard.writeText(`${protocol}//${hostName}:${port}${path}?peer=${this.meAsPeer.id}`).then(_ => _)
    }
  }
}
