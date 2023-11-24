import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";
import FormImagePicker from "../components/input/image_picker/FormImagePicker";
import * as YUP from "yup";
import Form from "../components/form/Form";
import FormSubmitButton from "../components/input/button/FormSubmitButton";
import {Avatar, Button} from "react-native-paper";
import CustomCard from "../components/card/Card";

const HomeScreen: React.FC = () => {

    const validationSchemer = YUP.object().shape({
        image: YUP.string().label("Image").required(),
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Form initialValue={{
                image: "",

            }}
                onSubmit={(value) => {
                    console.log(value);
                }}
                validationSchema={validationSchemer}
            >
                <View style={styles.heading}>
                    <LogoText width={100} height={100} />
                </View>

                <View>
                    <Text style={styles.text}>Your Pets</Text>
                </View>

                <View style={styles.petProfile}>
                    <Avatar.Image size={100} source={require('../assets/pet_profile.jpg')} />
                    <View style={styles.space} />
                    <FormImagePicker name="image" size={100} />
                </View>

                <View>
                    <Text style={styles.text}>Community Events</Text>
                </View>


                <View style={styles.bookButton} >
                    <FormSubmitButton title="Book a walk" />
                </View>

            </Form>

            <View style={styles.cardContainer}>
                <CustomCard
                    title="Hakaniemi Group Walk"
                    subTitle="Oct 24 at 6:00 pm"
                    mode="contained"
                    image={{uri: "https://images.pexels.com/photos/681390/pexels-photo-681390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}} 
                />
            </View>
            
        </ScrollView>
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
        paddingBottom: 20,
    },
    text: {
        fontSize: 16,
        color: Colors.textDark,
    },
    petProfile: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: 20


    },
    space: {
        width: 10,
    },
    bookButton: {
        alignSelf: "center",
        padding: 20,
    },
    cardContainer: {
        justifyContent: "center",
        alignItems: "center",

    }
});

export default HomeScreen;
