import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Text,
  SectionList,
} from "react-native";
import LogoText from "../../components/LogoText";
import Icon from "react-native-vector-icons/FontAwesome";

const DATA = [
  {
    title: "Your Pets",
    data: ["Minnie", "Tessu"],
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Icon name="bars" size={30} style={styles.hamburgerIcon} />
        <LogoText style={styles.logoText} />
      </View>
      <View style={styles.sectionContainer}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topBar: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  sectionContainer: {
    padding: 10,
  },
  logoText: {
    marginLeft: 10,
  },
  item: {
    // backgroundColor: "#f9c2ff",
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 25,
    // backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});

export default HomeScreen;
