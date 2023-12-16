import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import React, {ReactNode, useState} from "react";
import {useFormikContext} from "formik";
import ItemPicker from "./ItemPicker";
import {TextInputProps} from "react-native-paper";

interface FormItemPickerProps {
    name: string,
    data?: any[];
    labelExtractor?: (item: any) => string;
    valueExtractor: (item: any) => any;
    renderItem: ({
        item,
        index,
        separators,
    }: {
        item: any;
        index: number;
        separators: {
            highlight: () => void;
            unhighlight: () => void;
            updateProps: (select: "leading" | "trailing", newProps: any) => void;
        };
    }) => ReactNode;
    label?: string;
    prefixIcon?: string;
    surfixIcon?: string;
    onSurfixIconPressed?: () => void;
    onPrefixIconPressed?: () => void;
    variant?: "flat" | "outlined";
    error?: string;
    helpText?: string;
    horizontal?: boolean;
    columnCount?: number;
    searchable?: boolean;
    searchStyle?: TextInputProps;
    contentContainerStyle?: StyleProp<ViewStyle>;

}

const FormItemPicker: React.FC<FormItemPickerProps> = ({...props}) => {
    const {values, setFieldValue, errors} = useFormikContext();
    const _values: any = values;
    const _errors: any = errors;

    return (
        <ItemPicker
            {...{
                ...props,
                item: _values[props.name],
                onItemChanged: (item) => setFieldValue(props.name, item),
                error: _errors[props.name],
            }}
        />
    );
}

export default FormItemPicker;

const styles = StyleSheet.create({})