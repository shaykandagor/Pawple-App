import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {RadioButton as PaperRadioButton} from 'react-native-paper';

interface RadioButtonComponentProps {
    value: string;
    label: string
    status: 'checked' | 'unchecked';
    onPress: () => void
}

const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({value, status, onPress, label}) => {
    return (
        <PaperRadioButton.Item
            label={label}
            value={value}
            status={status}
            onPress={onPress}
        />
    )
}

export default RadioButtonComponent

const styles = StyleSheet.create({})