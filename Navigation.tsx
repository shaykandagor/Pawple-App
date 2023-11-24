import {NavigationContainer} from "@react-navigation/native";
import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import HomeScreen from "./app/screens/HomeScreen";
import PetInfoScreen from "./app/screens/PetInfoScreen";
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from "./app/screens/LoginScreen";
import AccountVerifyScreen from "./app/screens/AccountVerifyScreen";
import PetRegisterScreen from "./app/screens/PetRegisterationScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import DetailsVerificationScreen from "./app/screens/DetailsVerificationScreen";


// Navigation Drawer
const {Navigator, Screen} = createDrawerNavigator();

const DrawerGroup = () => {
    return (
        <Navigator initialRouteName="Home">
            <Screen name="Home" component={HomeScreen} />
            <Screen name="Welcome" component={WelcomeScreen} />
            <Screen name="LoginScreen" component={LoginScreen} />
            <Screen name="Account Verify" component={AccountVerifyScreen} />
            <Screen name="Pet Info" component={PetInfoScreen} />
            <Screen name="Pet Register" component={PetRegisterScreen} />
            <Screen name="Details Verify" component={DetailsVerificationScreen} />
        </Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <DrawerGroup />
        </NavigationContainer>

    )
}

export default Navigation;

const styles = StyleSheet.create({})

