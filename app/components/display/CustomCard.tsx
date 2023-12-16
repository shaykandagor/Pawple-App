import {StyleSheet} from 'react-native'
import React from 'react'
import {Text, Card} from "react-native-paper";
import {Colors} from '../../colors'

interface CardProps {
    title?: string,
    subTitle?: string,
    content?: string
    mode: 'elevated' | 'outlined' | 'contained'
    image: {uri: string} | string;
    onPress?: () => void

}

const CustomCard: React.FC<CardProps> = ({title, subTitle, mode, image, onPress}) => {
    return (
        <Card mode={mode} onPress={onPress} style={styles.card}>
            <Card.Cover source={typeof image === 'string' ? {uri: image} : image} />
            <Card.Content style={styles.contentContainer}>
                <Text variant='titleLarge' style={{color: Colors.white}} >{title}</Text>
                <Text variant='titleMedium' style={{color: Colors.white}} >{subTitle}</Text>
            </Card.Content>
        </Card>
    )
}

export default CustomCard

const styles = StyleSheet.create({
    card: {
        width: "100%",
        marginBottom: 10,
    },
    contentContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
        justifyContent: "flex-end",
    }
})
