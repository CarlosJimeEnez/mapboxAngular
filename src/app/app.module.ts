import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './@core/components/map/map.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environment/environment';

// const config: SocketIoConfig = {
// 	url: environment.socketUrl.url, // socket server url;
// 	options: {
//     withCredentials: false, 
//     extraHeaders: {
//       'Access-Control-Allow-Origin': 'http://localhost:4200'
//     }
// 	}
// }

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    MatSnackBarModule,
    MatFormFieldModule,
    BrowserAnimationsModule, 
    BrowserModule
    // SocketIoModule.forRoot(config)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})

export class AppModule  {}
