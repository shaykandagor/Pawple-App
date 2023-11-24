import React, {useState} from "react";
import {
    ScrollView,
    StyleSheet,
    View
} from "react-native";
import LogoText from "../components/logo/LogoText";
import * as YUP from "yup";
import FormImagePicker from "../components/input/image_picker/FormImagePicker";
import FormSubmitButton from "../components/input/button/FormSubmitButton";
import FormTextInput from "../components/input/text_input/FormTextInput";
import Form from "../components/form/Form";
import {Colors} from "../colors";

const validationSchemer = YUP.object().shape({
    image: YUP.string().label("Image").required(),
    fullname: YUP.string().label("full name").required(),
    email: YUP.string().label("email").required().email(),
    password: YUP.string().label("password").required(),
});

const LoginScreen: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Form
                initialValue={{
                    image: "",
                    fullname: "",
                    email: "",
                    password: "",
                }}
                onSubmit={(value) => {
                    console.log(value);
                }}
                validationSchema={validationSchemer}
            >
                <View style={styles.logo}>
                    <LogoText width={150} height={150} />
                </View>

                <View style={styles.image}>
                    <FormImagePicker name="image" size={150} />
                </View>
                
                <View style={styles.inputsContainer}>
                    <View style={styles.inputs}>
                        <FormTextInput name="fullname" inputProps={{label: "Full Name", mode: "outlined", inputMode: "text"}} />
                    </View>
                    <View style={styles.inputs}>
                        <FormTextInput name="email" inputProps={{label: "Email Address", mode: "outlined", inputMode: "email"}} />
                    </View>

                    <View style={styles.inputs}>
                        <FormTextInput name="password" inputProps={{label: "Password", mode: "outlined", secureTextEntry: true}} />
                    </View>
                </View>

                <View style={styles.verifyButton}>
                    <FormSubmitButton title="Verify Account" />
                </View>


            </Form>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.white,
    },
    logo: {
        alignItems: "center",

    },
    image: {
        alignItems: "center",
        paddingBottom: 20,

    },
    inputsContainer: {
        padding: 20
    },
    inputs: {
        marginBottom: 30,
    },
    verifyButton: {
        padding: 40,
        alignSelf: "center"
    }
    
});

export default LoginScreen;
