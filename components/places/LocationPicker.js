import { View, Alert, StyleSheet, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { getAddress } from "../../util/location";

export default function LocationPicker({onPickLocation}) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocus = useIsFocused();

  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const [locationPicked, setLocationPicked] = useState();

  useEffect(() => {
    if (isFocus && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setLocationPicked(mapPickedLocation);
    }
  }, [route, isFocus]);

  useEffect(() => {
    async function handlerLocation() {
      if(locationPicked){
        const address = await getAddress(locationPicked.lat, locationPicked.lng);
        onPickLocation({...locationPicked, address: address.features[0].properties.formatted})
      }
    }
    handlerLocation();
  }, [locationPicked, onPickLocation])

  async function verifyPermission() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    return true;
  }

  async function getLocationHandler() {
    const permission = await verifyPermission();
    if (!permission) {
    }
    const location = await getCurrentPositionAsync();
    setLocationPicked({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    // console.log(location);
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet</Text>;

  if (locationPicked) {
    locationPreview = (
      <Image
        source={{
          uri: "https://www.impala.pt/wp-content/uploads/2019/01/Google-maps.jpg",
        }}
        style={styles.image}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
