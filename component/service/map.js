import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Button } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function GoogleMaps({
  hideModal,
  region,
  markerCoordinate,
  handleRegionChange,
  handleMapPress,
}) {
  const handleConfirm = () => {
    hideModal();
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={region}
        onPress={handleMapPress}
        onRegionChangeComplete={handleRegionChange}
      >
        {markerCoordinate && <Marker coordinate={markerCoordinate} />}
      </MapView>
      <View style={styles.confirmContainer}>
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  confirmContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
