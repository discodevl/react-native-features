import { View, Text } from 'react-native'
import React from 'react'
import PlaceForm from '../components/places/PlaceForm'

export default function AddPlace({navigation}) {
  
  function createPlace(place) {
    navigation.navigate('AllPlaces', {place: place})
  }

  return (
    <PlaceForm onCreatePlace={createPlace}/>
  )
}