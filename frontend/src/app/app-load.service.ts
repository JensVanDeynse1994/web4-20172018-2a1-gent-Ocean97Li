
export class AppLoadService {

  getAPI(): void {
    const api = new GOOGLE_MAPS_API();
  }
}

// tslint:disable-next-line:class-name
export class GOOGLE_MAPS_API {
  constructor() {
    this.apikey();
  }
  public static api = 'AIzaSyB5eI2VPmS7wwP74_qbB6bujbzxD-xbLt4';
  public apikey(): any {
    if (!GOOGLE_MAPS_API.api) {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open( 'GET', '/API/google', false ); // false for synchronous request
      xmlHttp.send( null);
      GOOGLE_MAPS_API.api = xmlHttp.responseText.replace('"', '').replace('"', '');
    }
    return GOOGLE_MAPS_API.api;
  }
}
