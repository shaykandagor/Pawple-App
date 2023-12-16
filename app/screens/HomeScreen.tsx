import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";
import {Avatar} from "react-native-paper";
import CustomCard from "../components/display/CustomCard";
import ClickButton from "../components/input/button/ClickButton";

const HomeScreen: React.FC = () => {

    return (
        <View style={styles.container}>

            <View>
                <View style={styles.heading}>
                    <LogoText width="100%" height={30} />
                </View>

                <View>
                    <Text style={styles.text}>Your Pets</Text>
                </View>

                <View style={styles.petProfile}>
                    <Avatar.Image size={100} source={require('../assets/pet_profile.jpg')} />
                    <View style={styles.space} />
                    <Avatar.Icon icon="plus" size={100} style={{backgroundColor: Colors.lightGray}} />
                </View>

                <View style={{alignSelf: "flex-start"}}>
                    <Text style={styles.text}>Community Events</Text>
                </View>
            </View>

            <ScrollView >

                <View style={styles.cardContainer}>
                    <CustomCard
                        title="Hakaniemi Group Walk"
                        subTitle="Oct 24 at 6:00 pm"
                        mode="contained"
                        image={"https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    />
                    <CustomCard
                        title="Hakaniemi Group Walk"
                        subTitle="Oct 24 at 6:00 pm"
                        mode="contained"
                        image={"https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    />
                    <CustomCard
                        title="Hakaniemi Group Walk"
                        subTitle="Oct 24 at 6:00 pm"
                        mode="contained"
                        image={"https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    />
                    <CustomCard
                        title="Hakaniemi Group Walk"
                        subTitle="Oct 24 at 6:00 pm"
                        mode="contained"
                        image={"https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    />
                </View>
            </ScrollView>
            <View style={styles.bookButton} >
                <ClickButton icon="dog" mode="contained" onPress={() => console.log('Pressed')} title="Book a walk"></ClickButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
    },
    heading: {
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        color: Colors.textDark,
        paddingVertical: 10,
    },
    petProfile: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    space: {
        width: 10,
    },
    bookButton: {
        alignSelf: "center",
        padding: 20,
        position: "absolute",
        bottom: 20,
        zIndex: 1,
    },
    cardContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,

    }
});

export default HomeScreen;
