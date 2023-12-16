import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useFormikContext} from "formik";
import {Button} from "react-native-paper";

interface FormSubmitProps{
    title: string,
    mode: 'contained' | 'outlined'
}
const FormSubmitButton:React.FC<FormSubmitProps> = ({title, mode}) => {
const {handleSubmit, errors} = useFormikContext();

    return (
        <Button
            onPress={() => {
                handleSubmit();
            }}
            mode={mode}
        >
            {title}
        </Button>
    );
};

export default FormSubmitButton;

const styles = StyleSheet.create({});