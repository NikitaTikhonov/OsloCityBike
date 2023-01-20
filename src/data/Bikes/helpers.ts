import {
  Coordinate,
  StationsInfo,
  StationsInfoHash,
  StationsStatus,
  StationsStatusHash,
} from './types'

export const createCoordinates = (lat: number, lng: number): Coordinate => {
  return {
    lat,
    lng,
  }
}
export const createStationsInfoHash = (
  stations: StationsInfo[],
): StationsInfoHash => {
  const result: StationsInfoHash = {}
  stations.forEach(station => {
    result[station.station_id] = {
      coordinate: createCoordinates(station.lat, station.lon),
      name: station.name,
    }
  })
  return result
}

export const createStationsStatusHash = (
  stations: StationsStatus[],
): StationsStatusHash => {
  const result: StationsStatusHash = {}
  stations.forEach(station => {
    result[station.station_id] = station.num_bikes_available
  })
  return result
}
