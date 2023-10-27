import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../colors";
import LogoText from "../../components/LogoText";
import Logo from "../../components/Logo";
import GoogleIcon from "../../components/GoogleIcon";
import AppleIcon from "../../components/AppleIcon";

const WelcomeScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Logo width={200} height={200} />
        <LogoText width={100} height={100} />
        <Text style={styles.slogan}>
          Trustworthy pet walkers on demand. Tap, book, and enjoy stress-free
          strolls provided by a friendly walker.
        </Text>
      </View>
      <TouchableOpacity style={styles.signInButtonContainer}>
        <View style={styles.signInButton}>
          <GoogleIcon width={20} height={20} style={styles.icons} />
          <Text style={styles.signInButtonText}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButtonContainer}>
        <View style={styles.signInButton}>
          <AppleIcon width={28} height={28} style={styles.icons} />
          <Text style={styles.signInButtonText}>Sign in with Apple</Text>
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
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  slogan: {
    padding: 30,
    paddingBottom: 10,
    fontSize: 15,
    color: Colors.textLight,
    fontWeight: "500",
    textAlign: "center",
  },
  icons: {
    marginRight: 10,
  },
  signInButtonContainer: {
    width: 350,
    marginHorizontal: 50,
    marginVertical: 10,
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  signInButtonText: {
    fontWeight: "bold",
    color: Colors.textLight,
    textAlign: "center",
    marginLeft: 10,
    fontSize: 15,
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
