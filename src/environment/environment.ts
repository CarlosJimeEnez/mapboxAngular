// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    mapboxKey: 'pk.eyJ1Ijoiam9zZWNhcmwwcyIsImEiOiJjbGt3dTJzYmsxMWJrM2VwZDU0YjlpMjZkIn0.ukyOI0HvOHp0zxZM5pYxOQ',
    socketUrl: {
      url: "http://127.0.0.1:5000", 
      options: {
        withCredentials: false, 
        extraHeaders: {
          'Access-Control-Allow-Origin': 'http://localhost:4200'
        }
      }
    } 
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  