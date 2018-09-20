import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const ListItem = (props) => (

  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem} >
      <Image resizeMode='cover' style={styles.placeImage} source={props.placeImg} />
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>

)

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    margin: 5,
    padding: 20,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeImage: {
    marginRight: 8,
    height: 30,
    width: 30
  }
})

export default ListItem