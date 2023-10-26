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

const PetRegisterScreen = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthDay] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileImageContainer}>
        <LogoText width={120} height={120} />
        <Image
          source={require("../assets/pet_profile.jpg")}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Set up your pet</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Birthday</Text>
        <TextInput
          style={styles.input}
          placeholder="Birthday"
          value={birthday}
          onChangeText={setBirthDay}
        />
      </View>
      <View style={styles.petButtonContainer}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.petButton}>
            <Text style={{ fontWeight: "bold", color: Colors.primaryDark }}>
              Dog
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.petButton}>
            <Text style={{ fontWeight: "bold", color: Colors.primaryDark }}>
              Cat
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.next}>
          <View style={styles.nextButton}>
            <Text style={{ fontWeight: "bold", color: Colors.white }}>
              Next
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
  heading: {
    padding: 40,
    fontSize: 25,
    color: Colors.textDark,
    fontWeight: "600",
    textAlign: "center",
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.lightGray,
  },
  petButtonContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  petButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    marginHorizontal: 30,
  },
  button: {
    width: 150,
  },
  nextButtonContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  next: {
    width: 350,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    padding: 10,
    alignItems: "center",
  },
});

export default PetRegisterScreen;
