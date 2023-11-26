import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Button} from 'react-native-paper'
import {Colors} from '../../../colors'

interface ClickButtonProps {
    mode: 'text' | 'outlined' | 'contained' | 'elavated' | 'contained-tonal'
    icon?: string
    title: string
    onPress: () => void


}

const ClickButton: React.FC<ClickButtonProps> = ({icon, title, onPress}) => {
    return (
        <Button
            icon={icon}
            mode="contained"
            onPress={() => {
                onPress();
            }}>
            {title}
        </Button>

    )
}

export default ClickButton

const styles = StyleSheet.create({})