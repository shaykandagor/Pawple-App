import {StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
import ImageSelector from './ImageSelector';
import {useFormikContext} from 'formik';

interface FormImageSelectorProps {
    name: string
    items?: any[];
    valueExtractor: (item: any) => any
    value?: any;
    onValueChange?: (value: any) => void;
    imageExtractor: (item: any) => string;
}

const FormImageSelector: React.FC<FormImageSelectorProps> = ({...props}) => {
    const {values, setFieldValue, errors} = useFormikContext();
    const _values: any = values;
    const _errors: any = errors;

    return (
        <ImageSelector 
        {...{
            ...props,
            value: _values[props.name],
            onValueChange: (value) => setFieldValue(props.name, value),
            error: _errors[props.name]
        }}
        
        />
    );
};



export default FormImageSelector
