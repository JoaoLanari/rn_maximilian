import React from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

const InputItem = (props) => (
  <View style={styles.inputContainer} >
    <TextInput
      placeholder='An awesome place'
      value={props.placeName}
      onChangeText={props.onPlaceNameChangeHandler}
      style={styles.placeInput}
    />
    <Button title='Add' style={styles.placeButton} onPress={props.onPlaceSubmitHendler} />
  </View>
)

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeInput: {
    width: '70%'
  },
  placeButton: {
    width: '30%'
  },
})

export default InputItem