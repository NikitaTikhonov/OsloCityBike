import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

interface Props {
  name: string
  id: string
  focusItem: (id: string) => void
}

export const StationName: React.FC<Props> = React.memo(
  ({name, focusItem, id}: Props) => {
    return (
      <TouchableOpacity style={styles.container} onPress={() => focusItem(id)}>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    height: 50,
    marginVertical: 6,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,

    elevation: 4,
  },
  name: {
    marginStart: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
})
