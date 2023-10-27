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
        <View style={styles.descriptionButtonContainer}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.descriptionButton}>
              <Text style={styles.descriptionButtonText}>Vaccinated</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.descriptionButton}>
              <Text style={styles.descriptionButtonText}>Potty trained</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.descriptionButton}>
              <Text style={styles.descriptionButtonText}>Shy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.descriptionButton}>
              <Text style={styles.descriptionButtonText}>Friendly</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.descriptionButton}>
              <Text style={styles.descriptionButtonText}>Fiesty</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.descriptionButton}>
              <Text style={styles.descriptionButtonText}>Neuterer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.descriptionButton}>
              <Text style={styles.descriptionButtonText}>Trained</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.descriptionButton}>
              <Text style={styles.descriptionButtonText}>Intelligent</Text>
            </View>
          </TouchableOpacity>
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
    flex: 1,
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 12,
  },
  descriptionButton: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  descriptionButtonText: {
    fontWeight: "bold",
    color: Colors.black,
  },
  doneContainer: {
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
