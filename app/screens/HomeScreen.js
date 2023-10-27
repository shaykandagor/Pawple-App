import { StyleSheet, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import LogoText from "../../components/LogoText";
import Logo from "../../components/Logo";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Icon name="bars" size={30} style={styles.hamburgerIcon} />
        <View style={styles.logoText}>
          <LogoText width={100} height={100} />
        </View>
        <View style={styles.logo}>
          <Logo width={35} height={35} />
        </View>
      </View>
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
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
  },
  hamburgerIcon: {
    alignSelf: "flex-start",
  },
  logoText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    alignSelf: "flex-end",
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen;
