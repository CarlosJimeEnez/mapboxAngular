import { OnChanges, AfterViewInit, Component, OnInit } from '@angular/core';
import { Camion } from '@core/interface/camion';
import { MapService } from '@core/services/map.service';
import { LocalizacionesService } from 'src/app/services/localizaciones.service';
import * as mapboxgl from 'mapbox-gl'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from '@angular/material/form-field';
import { Observable, interval } from "rxjs"

// import { SocketService } from 'src/app/services/chat-service.service';
// import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  durationInSeconds: number = 3; 
  camiones: Camion[] | null = null;
  camion: Camion = {
    Nombre: ".",
    Empresa: ".",
    Lng: 0,
    Lat: 0
  }
  mapbox = (mapboxgl as typeof mapboxgl);
  mapa!: mapboxgl.Map;
  marker = new mapboxgl.Marker
  style = 'mapbox://styles/mapbox/light-v11';
  zoom = 12;
  intervalTime = 5000
  private message = {
    user: 'Husnain',
    messageContent: 'Hello World!',
  };

  constructor(
    private map: MapService,
    private localizaciones: LocalizacionesService,
    private _snackBar: MatSnackBar,
    // private socketService: SocketService,
    // private modalService: SocketService,
    // private socket: Socket
    ){
      this.durationInSeconds = 3
    }

  ngOnInit(){
    this.localizaciones.getLocalizacionesByEmpresa("AstrumSatelital")
     .subscribe(data => {
        this.camiones = data
        this.camion.Lat = this.camiones[0].Lat
        this.camion.Lng = this.camiones[0].Lng
        console.log(data[0])
        this.mapa = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.camion.Lng, this.camion.Lat] // Long, Lat
      });
  
        this.marker = new mapboxgl.Marker({
          draggable: true
        })
          .setLngLat([this.camion.Lng, this.camion.Lat])
          .addTo(this.mapa)
      }, 

     error => {
       console.log(error)
      })
    }

    camionEntrando(): void {
      this._snackBar.open("Entrando ... ", "", {
        duration: 3000, 
        horizontalPosition: "right", 
      })    
    }

      ////////////////////
      // interval(this.intervalTime).subscribe(x => {
      //   this.localizaciones.getLocalizacionesByEmpresa("AstrumSatelital")
      //    .subscribe(data => {
      //     this.camiones = data 
      //     this.camion.Lat = this.camiones[0].Lat
      //     this.camion.Lng = this.camiones[0].Lng
          
      //     this.marker.setLngLat([this.camion.Lng, this.camion.Lat])
      //     console.log(`Lat:${this.camion.Lat} Lng:${this.camion.Lng}`)
      //    })
      // })

    // this.socketService.emitData()
    // interval(this.intervalTime)
    //   .subscribe(x => {
    //     this.getMessage().subscribe(msg => {
    //       console.log(msg)
    //     })    
    //   })
  //  this.socketService.onFetchMovies()
  // }  
  // enviarInfo() {
  //   this.socketService.emitData()
  //   console.log("info")
  // }
    
}
