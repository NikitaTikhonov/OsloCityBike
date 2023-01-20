import {StationsInfoData, StationsStatusData} from './types'

export const getStationsInfo = (): Promise<{data: StationsInfoData}> => {
  return fetch(
    'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json',
  ).then(res => res.json())
}

export const getStationsStatus = (): Promise<{data: StationsStatusData}> => {
  return fetch(
    'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json',
  ).then(res => res.json())
}
