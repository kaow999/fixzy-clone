import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function GoogleMaps() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const handleMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerCoordinates({ latitude, longitude });
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={region}
            onRegionChange={handleRegionChange}
          >
            <Marker
              coordinate={markerCoordinates}
              title="Marker Title"
              description="Marker Description"
              draggable
              onDragEnd={handleMarkerDragEnd}
            />
          </MapView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
