import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms"
import { AppComponent } from './app.component';
import { ScreenCaptureComponent } from './screen-capture/screen-capture.component';
import { CameraCaptureComponent } from './camera-capture/camera-capture.component';
import { routes } from './routes';
import { PeerScreenComponent } from './peer-screen/peer-screen.component';
import { PeerMediaComponent } from './peer-media/peer-media.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenCaptureComponent,
    CameraCaptureComponent,
    PeerScreenComponent,
    PeerMediaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
