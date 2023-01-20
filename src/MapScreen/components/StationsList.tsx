import React, {useContext} from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {StationName} from './StationName'
import {BikesContext, ListItem} from '../../data/Bikes'
import {LIST_ITEM_HEIGHT} from '../../utils'

interface Props {
  focusItem: (id: string) => void
}

const getItemLayout = (data: ListItem[] | null | undefined, index: number) => ({
  length: data?.length ?? 0,
  offset: LIST_ITEM_HEIGHT * index,
  index,
})

export const StationsList: React.FC<Props> = React.memo(
  ({focusItem}: Props) => {
    const {stationsList} = useContext(BikesContext)

    const renderItem = ({item}: {item: ListItem}) => (
      <StationName name={item.name} focusItem={focusItem} id={item.id} />
    )

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={6}
        removeClippedSubviews={true}
        data={stationsList}
        renderItem={renderItem}
        style={styles.container}
        keyExtractor={item => item.id}
        getItemLayout={getItemLayout}
      />
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 4,
    backgroundColor: 'white',
  },
})
