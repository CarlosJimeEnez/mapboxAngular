import { Injectable, OnInit } from '@angular/core';
import { environment } from "../../../environment/environment";
import * as mapboxgl from 'mapbox-gl'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v11';

  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 20.0003333;
  lng = -99.2126349;
  zoom = 3;
  isInStyle = "#79018C"
  
  
  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapboxKey;
  }
  

  buildMap(lng: number, lat: number) {
    console.log("lng en servicio " + lng);
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [lng, lat] // Long, Lat
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  isPointInsidePolygon(point: number[], polygon: number[][]): boolean {
    const x = point[1]; // Longitud del punto
    const y = point[0]; // Latitud del punto
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0]; // Longitud del vértice i
      const yi = polygon[i][1]; // Latitud del vértice i
      const xj = polygon[j][0]; // Longitud del vértice j
      const yj = polygon[j][1]; // Latitud del vértice j

      const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  

  crearMarcador(long: number, lat: number): void {
    const marker = new mapboxgl.Marker({
      draggable: true,
    }).setLngLat([0, 0])
    .addTo(this.map)
    // marker.remove()
    marker.setLngLat([long, lat])
      marker.on('drag', () => {
      const { lng, lat } = marker.getLngLat()

      const point = [lat, lng]; // Coordenadas de un punto (latitud, longitud)
      
      const polygon =
        [
          [-67.13734, 45.13745],
          [-66.96466, 44.8097],
          [-68.03252, 44.3252],
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
        ; // Coordenadas de los vértices del polígono

      const isInside = this.isPointInsidePolygon(point, polygon);
      console.log(isInside); 
    })

  }

  makeLine(): void {
    this.map.on('load', () => {
      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [-122.483696, 37.833818],
              [-122.483482, 37.833174],
              [-122.483396, 37.8327],
              [-122.483568, 37.832056],
              [-122.48404, 37.831141],
              [-122.48404, 37.830497],
              [-122.483482, 37.82992],
              [-122.483568, 37.829548],
              [-122.48507, 37.829446],
              [-122.4861, 37.828802],
              [-122.486958, 37.82931],
              [-122.487001, 37.830802],
              [-122.487516, 37.831683],
              [-122.488031, 37.832158],
              [-122.488889, 37.832971],
              [-122.489876, 37.832632],
              [-122.490434, 37.832937],
              [-122.49125, 37.832429],
              [-122.491636, 37.832564],
              [-122.492237, 37.833378],
              [-122.493782, 37.833683]
            ]
          }
        }
      });

      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });
    });

  }

  makePolygon(): void {
    this.map.on('load', () => {
      // Add a data source containing GeoJSON data.
      this.map.addSource('maine', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Polygon',
            // These coordinates outline Maine.
            'coordinates': [
              [
                [-67.13734, 45.13745],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
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
      });

      // Add a new layer to visualize the polygon.
      this.map.addLayer({
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
      this.map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 3
        }
      });
    });
  }
}
