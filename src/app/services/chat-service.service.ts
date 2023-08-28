// import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';  

// @Injectable({
// 	providedIn: 'root'
// })
// export class SocketService {
// 	constructor(private socket: Socket) { }

//   // emit event
//   emitData() {
//      this.socket.emit('message', "Data");
//   } 

//   // listen event
//   onFetchMovies() {
//     return this.socket.fromEvent<any>('resultado').subscribe(data => {
//       console.log(data.message);
//     });
//   }

//   onMessage() {
//     this.socket.on('resultado', (data: any ) => {
//       console.log(`Message recieved: ${data.message}`);
//     })
//   } 
// }
