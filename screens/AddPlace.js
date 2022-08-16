import { View, Text } from "react-native";
import React from "react";
import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }) {
  async function createPlace(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces", { place: place });
  }

  return <PlaceForm onCreatePlace={createPlace} />;
}
