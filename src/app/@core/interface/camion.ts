export interface Camion {
    Empresa: string, 
    Nombre: string, 
    Lng: number, 
    Lat: number,
    marcador: mapboxgl.Marker, 
    isInside: boolean,
    estadoAnterior: boolean
}