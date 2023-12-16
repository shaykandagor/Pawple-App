import {StyleSheet, View, Image} from 'react-native'
import React from 'react'
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer"
import {Colors} from './app/colors'
import {Text} from 'react-native-paper'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import ClickButton from './app/components/input/button/ClickButton'

interface CustomDrawerProps {
    props: any
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({props}) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: Colors.skyBlue}}>
                <View style={styles.profileContainer}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{uri: "https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}}
                            style={styles.profileImage}
                        />
                    </View>
                    <View style={styles.space} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Walter</Text>
                        <Text style={styles.viewProfile}>View Profile</Text>
                        <View style={styles.rating}>
                            <MaterialCommunityIcons name='star' size={20} style={{color: Colors.primary}} />
                            <Text style={styles.ratingNumber}>4.80</Text>
                            <Text style={styles.ratingText}> Rating</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.itemContainer}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomView}>
                <Text style={{fontSize: 15, paddingBottom: 10, color: Colors.textDark, fontWeight: "600", alignSelf: "center"}}>Earn money on your schedule</Text>
                <ClickButton title='Become a walker' mode='contained' onPress={() => console.log("Pressed")} />
            </View>
        </View>
    );
}

export default CustomDrawer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
    profileContainer: {
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: Colors.white,
        paddingVertical: 20
    },
    profileImageContainer: {
        paddingLeft: 10,
        paddingBottom: 20,
        borderRadius: 5,
    },
    space: {
        width: 20,
    },
    profileInfo: {
        padding: 10
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    profileName: {
        color: Colors.textDark,
        fontSize: 20,
        fontWeight: "600"
    },
    viewProfile: {
        color: Colors.primary,
        paddingTop: 5

    },
    rating: {
        flexDirection: "row",
        paddingTop: 5

    },
    ratingNumber: {
        color: Colors.textDark,
        fontWeight: "bold"
    },
    ratingText: {
        color: Colors.ratingText
    },
    itemContainer: {
        flex: 1,
        paddingTop: 10,
        borderRadius: 20,
        marginVertical: 20,
        backgroundColor: Colors.white


    },
    bottomView: {
        padding: 20,
        backgroundColor: Colors.white,
        borderRadius: 10
    }
})