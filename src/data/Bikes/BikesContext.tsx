import React, {createContext, PropsWithChildren, useMemo} from 'react'
import {BikesInfo, ListItem} from './types'
import {useStations} from './useStations'

type BikesContextType = {
  data: Record<string, BikesInfo>
  loading: boolean
  error: boolean

  update: () => void

  stationsList: ListItem[]
}

export const BikesContext = createContext<BikesContextType>({
  data: {},
  loading: false,
  error: false,
  update: () => undefined,
  stationsList: [],
})

export const BikesContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const {error, data, loading, updateData} = useStations()

  const stationsList = useMemo(() => {
    return Object.keys(data)
      .map(id => {
        return {
          id,
          name: data[id].name,
        }
      })
      .sort(({name: n1}, {name: n2}) => n1.localeCompare(n2))
  }, [data])

  return (
    <BikesContext.Provider
      value={{data, error, loading, update: updateData, stationsList}}>
      {children}
    </BikesContext.Provider>
  )
}
