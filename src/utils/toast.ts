import Toast from 'react-native-toast-message'

export const showInfo = (name: string, bikesAvailable: number) => {
  Toast.show({
    type: 'success',
    text1: name,
    text2: bikesAvailabilityMessage(bikesAvailable),
    autoHide: false,
    onPress: Toast.hide,
    visibilityTime: 7000,
  })
}

export const showError = () => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'Something when wrong during the data loading',
    onPress: Toast.hide,
    visibilityTime: 5000,
  })
}

const bikesAvailabilityMessage = (bikes: number) => {
  if (bikes <= 0) {
    return 'There are no available bikes on this station'
  }
  return `Bikes available ${bikes}`
}
