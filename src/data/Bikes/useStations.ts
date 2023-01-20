import {useCallback, useMemo} from 'react'
import {useQueries} from 'react-query'
import {getStationsInfo, getStationsStatus} from './network'
import {BikesInfo, StationsInfoHash, StationsStatusHash} from './types'
import {createStationsInfoHash, createStationsStatusHash} from './helpers'

export const useStations = () => {
  const stationsResponse = useQueries([
    {
      queryKey: ['stationInfo'],
      queryFn: () => getStationsInfo(),
    },
    {
      queryKey: ['stationStatus'],
      queryFn: () => getStationsStatus(),
    },
  ])

  const loading = stationsResponse.some(result => result.isLoading)
  const error = stationsResponse.some(result => result.isError)

  const stationIdToStationsData: Record<string, BikesInfo> = useMemo(() => {
    const data: Record<string, BikesInfo> = {}
    if (loading || error) {
      return data
    }
    const stationsInfoHash: StationsInfoHash = createStationsInfoHash(
      stationsResponse[0]?.data?.data.stations ?? [],
    )
    const stationsStatusHash: StationsStatusHash = createStationsStatusHash(
      stationsResponse[1]?.data?.data.stations ?? [],
    )
    Object.keys(stationsInfoHash).forEach(key => {
      data[key] = {
        ...stationsInfoHash[key],
        bikeAvailable: stationsStatusHash[key],
      }
    })
    return data
  }, [error, loading, stationsResponse])

  const updateData = useCallback(() => {
    stationsResponse.map(response => response.refetch())
  }, [stationsResponse])

  return {
    loading,
    error,
    data: stationIdToStationsData,
    updateData: updateData,
  }
}
