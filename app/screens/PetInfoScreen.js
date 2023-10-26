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

const PetInfoScreen = () => {
  const [size, setSize] = useState("");
  const [sex, setSex] = useState("");

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
        <Text style={styles.name}>Milo, 2 years</Text>
        <Text style={styles.heading}>
          Please select the words that describe your pet more
        </Text>
        <View style={styles.descriptions}>
          <View style={styles.descriptionButtonContainer}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.descriptionButton}>
                <Text style={{ fontWeight: "bold", color: Colors.black }}>
                  Vaccinated
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.descriptionButton}>
                <Text style={{ fontWeight: "bold", color: Colors.black }}>
                  Potty trained
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.descriptionButton}>
                <Text style={{ fontWeight: "bold", color: Colors.black }}>
                  Shy
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.descriptionButton}>
                <Text style={{ fontWeight: "bold", color: Colors.black }}>
                  Friendly
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.label}>Size</Text>
        <TextInput
          style={styles.input}
          placeholder="Size"
          value={size}
          onChangeText={setSize}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sex</Text>
        <TextInput
          style={styles.input}
          placeholder="Sex"
          value={sex}
          onChangeText={setSex}
        />
      </View>
      <View style={styles.doneContainer}>
        <TouchableOpacity style={styles.done}>
          <View style={styles.doneButton}>
            <Text style={{ fontWeight: "bold", color: Colors.white }}>
              All Done
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
    padding: 30,
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
  name: {
    padding: 15,
    fontSize: 25,
    color: Colors.textDark,
    fontWeight: "600",
    textAlign: "center",
  },
  heading: {
    padding: 15,
    fontSize: 20,
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
  descriptionButtonContainer: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  descriptionButton: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.gray,
    alignItems: "center",
    marginVertical: 5,
  },
  button: {
    width: 200,
  },
  doneContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  done: {
    width: 350,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  doneButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primaryDark,
    padding: 10,
    alignItems: "center",
  },
});

export default PetInfoScreen;
