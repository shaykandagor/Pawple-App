import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Colors } from "../colors";
import LogoText from "../../components/LogoText";

const LoginScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileImageContainer}>
        <LogoText width={120} height={120} />
        <Image
          source={require("../assets/profile_picture.jpg")}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.radioContainer}>
        <Text style={styles.label}>I own a pet</Text>
        <TouchableOpacity style={styles.radioButton}>
          <View style={styles.radioInner} />
        </TouchableOpacity>
      </View>
      <View style={styles.verifyButtonContainer}>
        <TouchableOpacity style={styles.verifyAccount}>
          <View style={styles.accountButton}>
            <Text style={{ fontWeight: "bold", color: Colors.white }}>
              Verify Account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    padding: 40,
  },
  profileImageContainer: {
    padding: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.lightGray,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.darkGray,
    borderWidth: 1,
    borderRadius: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  verifyButtonContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  verifyAccount: {
    width: 350,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  accountButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    padding: 10,
    alignItems: "center",
  },
});

export default LoginScreen;
