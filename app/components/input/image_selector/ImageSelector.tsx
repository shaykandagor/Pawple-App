import {StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
import {Colors} from '../../../util/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import {MaterialCommunityIcons} from "@expo/vector-icons"

interface ImageSelectorProps {
    items?: any[];
    valueExtractor: (item: any) => any
    value?: any;
    onValueChange?: (value: any) => void;
    imageExtractor: (item: any) => string;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({items, valueExtractor, value, onValueChange, imageExtractor}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={valueExtractor}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.avatarContainer} onPress={onValueChange ? () => onValueChange(valueExtractor(item)) : undefined}>
                        <Avatar.Image source={{uri: imageExtractor(item)}} />
                        {value === valueExtractor(item) && <MaterialCommunityIcons name='check-circle' color={Colors.primaryDark} size={20} style={styles.icon} />}
                    </TouchableOpacity>
                )}
                horizontal
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {

    },
    avatarContainer: {
        padding: 10,
    },
    icon: {
        position: "absolute",
        right: 10,
        bottom: 10
    }

})

export default ImageSelector
