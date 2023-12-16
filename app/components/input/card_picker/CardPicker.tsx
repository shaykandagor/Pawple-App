import {StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
import {Avatar, Card} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Colors} from '../../../colors';

interface CardPickerProps {
    label?: string;
    items?: any[];
    value?: any;
    onValueChange?: (value: any) => void;
    titleExtractor: (item: any) => string
    valueExtractor: (item: any) => any
    subTitleExtractor?: (item: any) => string
    renderTrailer?: (item: any, props: {size: number}) => React.ReactNode

}

const CardPicker: React.FC<CardPickerProps> = ({label, items = [], value, onValueChange, titleExtractor, valueExtractor, subTitleExtractor, renderTrailer}) => {
    return (
        <View >
            {label && <Text>{label}</Text>}
            <FlatList
                data={items}
                keyExtractor={valueExtractor}
                renderItem={({item}) =>
                    <Card style={styles.card} onPress={onValueChange ? () => onValueChange(valueExtractor(item)) : undefined}>
                        <Card.Title
                            title={titleExtractor(item)}
                            titleStyle={styles.cardTitle}
                            subtitle={subTitleExtractor ? subTitleExtractor(item) : undefined}
                            subtitleStyle={styles.cardSubtitle}
                            left={value === valueExtractor(item) ? (props) => <MaterialCommunityIcons {...props} name="check-circle" color={Colors.primaryDark} size={30} /> : undefined}
                            right={renderTrailer ? (props) => renderTrailer(item, props) : undefined}
                        />
                    </Card>
                }
            />
        </View>
    )
}

export default CardPicker

const styles = StyleSheet.create({
    card: {
        paddingRight: 30,
        margin: 10,
        elevation: 5,
        backgroundColor: Colors.white,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textDark
    },
    cardSubtitle: {
        fontSize: 16,
        color: Colors.primary
    },
})