import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useFormikContext} from "formik";
import {Button} from "react-native-paper";
import { Colors } from "../../../colors";


const FormSubmitButton = ({title}: {title: string}) => {
    const {handleSubmit, errors, values} = useFormikContext();

    console.log(values)

    return (
        <Button
            style={styles.formSubmitButton}
            onPress={() => {
                handleSubmit();
            }}
            mode="contained"
        >
            {title}
        </Button>
    );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
    formSubmitButton: {
        color: Colors.primary,
        borderColor: Colors.primaryDark,
        borderWidth: 1,
        width: 350,
    }
});