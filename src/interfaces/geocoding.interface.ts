export interface GeocodedLocation {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
  local_names: {[key: string]: string};
}