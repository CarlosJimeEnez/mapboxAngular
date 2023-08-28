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

  lng_polygon: number = -68.137343;
  lat_polygon: number = 45.137451;

  mapbox = (mapboxgl as typeof mapboxgl);
  mapa!: mapboxgl.Map;
  marker = new mapboxgl.Marker
  style = 'mapbox://styles/mapbox/light-v11';
  zoom = 5;
  intervalTime = 5000
  
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
          center: [this.lng_polygon, this.lat_polygon] // Long, Lat
        });

        this.mapa.on("load", () =>{
          this.mapa.addSource("maine", {
            "type": "geojson",
            "data": {
              "type": "Feature",
              "properties": {
              }, 
              "geometry": {
                "type": "Polygon",
                "coordinates": [
                  [
                    [-67.13734, 45.13745],
                    [-66.96466, 44.8097],
                    [-68.03252, 44.3252],
                    [-69.06, 43.98],
                    [-70.11617, 43.68405],
                    [-70.64573, 43.09008],
                    [-70.75102, 43.08003],
                    [-70.79761, 43.21973],
                    [-70.98176, 43.36789],
                    [-70.94416, 43.46633],
                    [-71.08482, 45.30524],
                    [-70.66002, 45.46022],
                    [-70.30495, 45.91479],
                    [-70.00014, 46.69317],
                    [-69.23708, 47.44777],
                    [-68.90478, 47.18479],
                    [-68.2343, 47.35462],
                    [-67.79035, 47.06624],
                    [-67.79141, 45.70258],
                    [-67.13734, 45.13745]
                  ]
                ]
              }
            }
          })

          // Add a new layer to visualize the polygon.
          this.mapa.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': 'maine', // reference the data source
            'layout': {},
            'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
            }
          });
          // Add a black outline around the polygon.
          this.mapa.addLayer({
            'id': 'outline',
            'type': 'line',
            'source': 'maine',
            'layout': {},
            'paint': {
            'line-color': '#000',
            'line-width': 3
            }
          })
        })
        
        // MARKER
        this.marker = new mapboxgl.Marker({
          draggable: true
        })
          .setLngLat([this.lng_polygon, this.lat_polygon])
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

    
}
