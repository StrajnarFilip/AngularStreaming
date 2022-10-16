import { Routes } from '@angular/router';
import { CameraCaptureComponent } from './camera-capture/camera-capture.component';
import { PeerMediaComponent } from './peer-media/peer-media.component';
import { PeerScreenComponent } from './peer-screen/peer-screen.component';
import { ScreenCaptureComponent } from './screen-capture/screen-capture.component';

export const routes: Routes = [
    { path: "screen-capture", component: ScreenCaptureComponent },
    { path: "camera-capture", component: CameraCaptureComponent },
    { path: "peer-screen", component: PeerScreenComponent },
    { path: "peer-media", component: PeerMediaComponent }
];