import { FlatList } from "react-native";
import React from "react";

export default function PlacesList({ places }) {
  function renderHandler() {}

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderHandler}
    />
  );
}
