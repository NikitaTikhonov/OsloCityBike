export type StationsInfoData = {
  stations?: StationsInfo[] | null
}
export type StationsInfo = {
  station_id: string
  name: string
  address: string
  rental_uris: RentalUris
  lat: number
  lon: number
  capacity: number
}
export type RentalUris = {
  android: string
  ios: string
}

export type StationsStatusData = {
  stations?: StationsStatus[] | null
}
export type StationsStatus = {
  station_id: string
  is_installed: number
  is_renting: number
  is_returning: number
  last_reported: number
  num_bikes_available: number
  num_docks_available: number
}

export type Coordinate = {
  lat: number
  lng: number
}

export type BikesInfo = {
  coordinate: Coordinate
  name: string
  bikeAvailable: number
}

export type StationsInfoHash = Record<
  string,
  Pick<BikesInfo, 'coordinate' | 'name'>
>

export type StationsStatusHash = Record<string, number>

export type ListItem = {id: string; name: string}
