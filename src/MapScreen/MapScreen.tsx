import React, {useCallback, useContext, useMemo, useState} from 'react'
import {SafeAreaView, StyleSheet} from 'react-native'
import {LeafletView} from '../Leaflet'
import {MapMarker, WebviewLeafletMessage} from '../Leaflet'
import {OSLO_CITY_CENTER, showInfo, showError, useOrientation} from '../utils'
import {bikesInfoToMarkers} from './helpers'
import {StationsList} from './components/StationsList'
import {BikesContext} from '../data/Bikes'

export const MapScreen: React.FC = () => {
  const {error, data} = useContext(BikesContext)
  const orientation = useOrientation()

  if (error) {
    showError()
  }

  const [mapCenter, setMapCenter] = useState(OSLO_CITY_CENTER)

  const markers: MapMarker[] = useMemo(() => bikesInfoToMarkers(data), [data])

  const focusStation = useCallback(
    (stationID: string) => {
      setMapCenter(data[stationID].coordinate ?? OSLO_CITY_CENTER)
      showInfo(data[stationID].name, data[stationID].bikeAvailable)
    },
    [data],
  )

  const onMessage = useCallback(
    (message: WebviewLeafletMessage) => {
      if (message.event === 'onMapMarkerClicked') {
        const id = message.payload?.mapMarkerID ?? null
        if (id === null) {
          return
        }

        focusStation(id)
      }
    },
    [focusStation],
  )

  const showShowStationsList = orientation === 'landscape'

  return (
    <SafeAreaView style={styles.container}>
      <LeafletView
        zoom={17}
        onMessageReceived={onMessage}
        mapCenterPosition={mapCenter}
        mapMarkers={markers}
      />
      {showShowStationsList ? <StationsList focusItem={focusStation} /> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
})
