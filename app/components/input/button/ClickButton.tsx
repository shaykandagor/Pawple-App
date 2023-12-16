import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Button} from 'react-native-paper'

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
            mode="outlined"
            onPress={() => {
                onPress();
            }}>
            {title}
        </Button>

    )
}

export default ClickButton

const styles = StyleSheet.create({})