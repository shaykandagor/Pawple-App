import {StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
import {Avatar, Card} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Colors} from '../../../colors';
import {useFormikContext} from 'formik';
import CardPicker from './CardPicker';

interface FormCardPickerProps {
    name: string
    label?: string;
    items?: any[];
    value?: any;
    onValueChange?: (value: any) => void;
    titleExtractor: (item: any) => string
    valueExtractor: (item: any) => any
    subTitleExtractor?: (item: any) => string
    renderTrailer?: (item: any, props: {size: number}) => React.ReactNode

}

const FormCardPicker: React.FC<FormCardPickerProps> = ({...props}) => {
    const {values, setFieldValue, errors} = useFormikContext();
    const _values: any = values;
    const _errors: any = errors;

    return (
        <CardPicker 
        {...{
            ...props,
            value: _values[props.name],
            onValueChange: (value) => setFieldValue(props.name, value),
            error: _errors[props.name]
        }}   
        />
    )
}

export default FormCardPicker
