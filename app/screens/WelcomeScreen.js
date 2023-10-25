import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Colors } from "../colors";

const WelcomeScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/pawple-logo.png")}
        />
        <Image source={require("../assets/pawple-logo-text.png")} />
        <Text style={styles.slogan}>
          Trustworthy pet walkers on demand. Tap, book, and enjoy stress-free
          strolls provided by a friendly walker.
        </Text>
      </View>
      <TouchableOpacity style={styles.signInGoogleButtonContainer}>
        <View style={styles.signInGoogleButton}>
          <Text style={{ fontWeight: "bold", color: Colors.textLight }}>
            Sign in with Google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signInAppleButtonContainer}>
        <View style={styles.signInAppleButton}>
          <Text style={{ fontWeight: "bold", color: Colors.textLight }}>
            Sign in with Apple
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountButtonContainer}>
        <View style={styles.accountButton}>
          <Text style={{ fontWeight: "bold", color: Colors.white }}>
            Create account
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={{ fontWeight: "400", color: Colors.primary }}>
          You already have an account?
        </Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  slogan: {
    padding: 40,
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: "500",
    textAlign: "center",
  },
  signInGoogleButtonContainer: {
    width: 350,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  signInGoogleButton: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    padding: 10,
    alignItems: "center",
  },
  signInAppleButtonContainer: {
    width: 350,
    marginHorizontal: 50,
    marginVertical: 10,
    marginBottom: 30,
  },
  signInAppleButton: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    padding: 10,
    alignItems: "center",
  },
  accountButtonContainer: {
    width: 350,
    marginHorizontal: 50,
    marginVertical: 10,
    marginBottom: 30,
  },
  accountButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    padding: 10,
    alignItems: "center",
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    padding: 50,
  },
  linkText: {
    color: Colors.primary,
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
