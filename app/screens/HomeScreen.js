import { StyleSheet, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 60.1659448,
          longitude: 24.9318512,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    paddingBottom: 20,
  },
});

export default HomeScreen;
