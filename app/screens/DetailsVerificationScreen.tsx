import React, {useState} from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";
import FormTextInput from "../components/input/text_input/FormTextInput";
import * as YUP from "yup";
import Form from "../components/form/Form";
import FormSubmitButton from "../components/input/button/FormSubmitButton";
import LocationPicker from "../components/maps/location_picker/LocationPicker";


const DetailsVerificationScreen: React.FC = () => {

    const validationSchemer = YUP.object().shape({
        name: YUP.string().label("name").required(),
        number: YUP.string().label("number").required(),


    });

    const [petPickupLoc, setPetPickupLocation] = useState({
        latitude: 60.1786038,
        longitude: 24.9092748,
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Form initialValue={{
                name: "",
                number: "",

            }}
                onSubmit={(value) => {
                    console.log(value);
                }}
                validationSchema={validationSchemer}
            >
                <View style={styles.heading}>
                    <LogoText width={150} height={150} />
                </View>

                <View style={styles.inputs}>
                    <FormTextInput name="name" inputProps={{label: "Full Name", mode: "outlined", inputMode: "text"}} />
                </View>

                <View style={styles.inputs}>
                    <FormTextInput name="number" inputProps={{label: "Social Security Number", mode: "outlined", inputMode: "text"}} />
                </View>

                <View>
                    <Text style={styles.info}>SSN helps us verify your identity</Text>
                    <Text style={styles.info}>Your personal information is safe and secure</Text>
                </View>

                <View style={styles.verifyButton} >
                    <FormSubmitButton mode="contained" title="Verify" />
                </View>

            </Form>
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
        paddingBottom: 100,
    },
    info: {
        fontSize: 15,
        color: Colors.textDark,
        textAlign: "center",
        padding: 10,
    },
    inputs: {
        padding: 10,
        marginBottom: 10,
    },
    verifyButton: {
        alignSelf: "center",
        marginTop: 50,
    },
});

export default DetailsVerificationScreen;
