import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Button} from 'react-native-paper'

interface ClickButtonProps {
    mode?: 'outlined' | 'contained'
    icon?: string
    title: string
    onPress: () => void


}

const ClickButton: React.FC<ClickButtonProps> = ({icon, title, onPress, mode = 'outlined'}) => {
    return (
        <Button
            icon={icon}
            mode={mode}
            onPress={() => {
                onPress();
            }}>
            {title}
        </Button>

    )
}

export default ClickButton

const styles = StyleSheet.create({})