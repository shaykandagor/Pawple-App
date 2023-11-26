import React, {useState} from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
} from "react-native";
import {Colors} from "../colors";
import LogoText from "../components/logo/LogoText";
import FormImagePicker from "../components/input/image_picker/FormImagePicker";
import FormTextInput from "../components/input/text_input/FormTextInput";
import * as YUP from "yup";
import Form from "../components/form/Form";
import FormDateTimePicker from "../components/input/date_picker/FormDateTimePicker";
import FormSubmitButton from "../components/input/button/FormSubmitButton";
import FormChipSelector from "../components/input/chip_selector/FormChipSelector";

interface PetRegisterProps {}

const PetRegisterScreen: React.FC<PetRegisterProps> = () => {

    const validationSchemer = YUP.object().shape({
        image: YUP.string().label("Image").required(),
        name: YUP.string().label("name").required(),
        dob: YUP.date().max(new Date()).label("Date of birth").required(),
        chip: YUP.string().label("chip").required()

    });

    const options = ["Dog", "Cat"];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Form initialValue={{
                image: "",
                name: "",
                dob: new Date(),
                chip: "",

            }}
                onSubmit={(value) => {
                    console.log(value);
                }}
                validationSchema={validationSchemer}
            >
                <View style={styles.logo}>
                    <LogoText width="100%" height={30} />
                </View>

                <View style={styles.image}>
                    <FormImagePicker name="image" size={150} />
                </View>

                <View>
                    <Text style={styles.setText}>Set up your pet</Text>
                </View>

                <View style={styles.inputs}>
                    <FormTextInput name="name" inputProps={{label: "Name", mode: "outlined", inputMode: "text"}} />
                </View>

                <View style={styles.inputs}>
                    <FormDateTimePicker name="dob"
                        formater={(date) =>
                            date.toLocaleDateString()
                        }
                        label="Date of birth"
                        prefixIcon="calendar"
                        surfixIcon="chevron-down"
                        mode="date"
                        display="default"
                        variant="outlined" />

                </View>

                <View style={styles.chips}>
                    <FormChipSelector name="chip" icon="check" mode="outlined" options={options} />
                </View>

                <View style={styles.nextButton} >
                    <FormSubmitButton mode="contained" title="Next" />
                </View>

            </Form>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        padding: 20,
    },
    logo: {
        padding: 20,
    },
    image: {
        alignItems: "center",
    },
    setText: {
        fontSize: 30,
        color: Colors.textDark,
        fontWeight: "600",
        textAlign: "center",
        padding: 20,
    },
    inputs: {
        padding: 10,
        marginBottom: 20,
    },
    chips: {
        alignItems: "center",
        padding: 20,
        marginBottom: 20,
    },
    nextButton: {
        alignSelf: "center",
    },
});

export default PetRegisterScreen;
