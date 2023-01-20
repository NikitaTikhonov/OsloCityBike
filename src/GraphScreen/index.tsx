import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes'
import {BarChart} from 'react-native-chart-kit'
import {BikesContext, ListItem} from '../data/Bikes'
import {BikesInfo} from '../data/Bikes/types'
import {MINUTE} from '../utils'

interface Props {}

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  fillShadowGradient: 'blue',
  fillShadowGradientOpacity: 1,
  barPercentage: 0.2,
  strokeWidth: 0,
  color: () => 'black',
  style: {
    borderRadius: 16,
  },
  decimalPlaces: 0,
}

const INITIAL_AMOUNT_TO_RENDER = 40
const NAME_LENGTH_HORIZONTAL = 7

const chartsData = (
  type: 'full' | 'initial',
  width: number,
  height: number,
  dataSet: Record<string, BikesInfo>,
  dataList: ListItem[],
) => {
  const items =
    type === 'full' ? dataList : dataList.slice(0, INITIAL_AMOUNT_TO_RENDER)
  return {
    labels:
      width > height
        ? items.map(item => `${item.name.slice(0, NAME_LENGTH_HORIZONTAL)}...`)
        : items.map(item => item.name),
    datasets: [
      {
        data: items.map(i => dataSet[i.id].bikeAvailable),
      },
    ],
  }
}

export const GraphScreen: React.FC<Props> = () => {
  const {stationsList, data, update, loading} = useContext(BikesContext)
  const {width, height} = useWindowDimensions()
  const filteredList = useMemo(
    () =>
      stationsList
        .filter(i => data[i.id].bikeAvailable > 0)
        .sort((a, b) => data[b.id].bikeAvailable - data[a.id].bikeAvailable),
    [data, stationsList],
  )

  const [graphData, setGraphData] = useState<ChartData>(
    chartsData('initial', width, height, data, filteredList),
  )

  // the data will be refetched only when user is on this screen
  // to achieve data refresh in all app we should add useEffect with similar logic to BikeContext
  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        update()
      }, MINUTE)
      return () => clearInterval(interval)
    }, [update]),
  )

  useEffect(() => {
    if (filteredList.length > INITIAL_AMOUNT_TO_RENDER) {
      setTimeout(() => {
        setGraphData(chartsData('full', width, height, data, filteredList))
      }, 1000)
    }
  }, [data, filteredList, height, width])

  const chartWidth = stationsList.length * 9 + 50

  return (
    <SafeAreaView style={styles.verticalScrollView}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={update} />
        }>
        <ScrollView style={{height, width}} horizontal={true}>
          <BarChart
            withVerticalLabels={true}
            yAxisSuffix={''}
            chartConfig={chartConfig}
            showValuesOnTopOfBars={true}
            data={graphData}
            width={chartWidth}
            height={height}
            withInnerLines={true}
            yAxisLabel="bikes "
            verticalLabelRotation={85}
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalScrollView: {flex: 10, backgroundColor: 'white'},
})
