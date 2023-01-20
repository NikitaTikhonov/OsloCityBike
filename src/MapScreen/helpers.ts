import {MapMarker} from '../Leaflet'
import {BikesInfo} from '../data/Bikes/types'
import {MARKER_ICON, MARKER_SIZE} from '../utils'

export const bikesInfoToMarkers = (
  data: Record<string, BikesInfo>,
): MapMarker[] =>
  Object.keys(data).map(key => {
    return {
      id: key,
      icon: MARKER_ICON,
      position: data[key].coordinate,
      size: MARKER_SIZE,
    }
  })
