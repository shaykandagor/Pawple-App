import CustomDrawer from "./CustomDrawer";
import {NavigationContainer} from "@react-navigation/native";
import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import PaymentMethods from "./app/screens/PaymentMethods";
import PromotionDeals from "./app/screens/PromotionDeals";
import Subscriptions from "./app/screens/Subscriptions";
import MyWalks from "./app/screens/MyWalks";
import SupportScreen from "./app/screens/SupportScreen";
import AboutScreen from "./app/screens/AboutScreen";
import HomeScreen from "./app/screens/HomeScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './app/screens/LoginScreen';
import AccountVerifyScreen from './app/screens/AccountVerifyScreen';
import PetInfoScreen from './app/screens/PetInfoScreen';
import PetRegisterScreen from './app/screens/PetRegisterationScreen';
import DetailsVerificationScreen from './app/screens/DetailsVerificationScreen';
import {Colors} from "./app/colors";
import ConfirmBookingScreen from "./app/screens/ConfirmBooking";
import SetPickUpLocation from "./app/screens/SetPickUpLocation";
import WalkSummary from "./app/screens/WalkSummary";
import ScreenRoutes from "./ScreenRoutes";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from 'react-native-gesture-handler';


// Navigation Drawer
const {Navigator, Screen} = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerGroup = () => {
    return (
        <Navigator screenOptions={{
            headerShown: true,
            drawerLabelStyle: {marginLeft: -20, fontSize: 15, paddingVertical: 18},
            drawerActiveBackgroundColor: Colors.lightGray,
            drawerActiveTintColor: Colors.primary,
            drawerInactiveBackgroundColor: Colors.white
        }}
            drawerContent={props =>
                <CustomDrawer props={props} />}>
            <Screen name="Payment Methods" component={PaymentMethods}
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name="wallet-outline" size={35} color={Colors.darkGray} />
                    )
                }}
            />
            <Screen name="Promotions and Deals" component={PromotionDeals}
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name="tag-outline" size={35} color={Colors.darkGray} />
                    )
                }} 
            />
            <Screen name="Subscriptions" component={Subscriptions}
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name="ticket-percent-outline" size={35} color={Colors.darkGray} />
                    )
                }} 
            />
            <Screen name="My Walks" component={MyWalks}
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name="clock-time-four-outline" size={35} color={Colors.darkGray} />
                    )
                }} 
            />
            <Screen name="Support" component={SupportScreen}
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name="message-question-outline" size={35} color={Colors.darkGray} />
                    )
                }} 
            />
            <Screen name="About" component={AboutScreen}
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name="information-outline" size={35} color={Colors.darkGray} />
                    )
                }} 
            />
        </Navigator>
    )
}

const AppStack = () => {
    return (
        <Stack.Navigator>
                <Stack.Screen name="DrawerGroup" component={DrawerGroup} options={{headerShown: false}} />
                <Stack.Screen name={ScreenRoutes.WELCOME} component={WelcomeScreen} />
                <Stack.Screen name={ScreenRoutes.LOGIN} component={LoginScreen} />
                <Stack.Screen name={ScreenRoutes.ACCOUNT_VERIFICATION} component={AccountVerifyScreen} />
                <Stack.Screen name={ScreenRoutes.PET_INFORMATION} component={PetInfoScreen} />
                <Stack.Screen name={ScreenRoutes.PET_REGISTRATION} component={PetRegisterScreen} />
                <Stack.Screen name={ScreenRoutes.DETAILS_VERFICATION} component={DetailsVerificationScreen} />
                <Stack.Screen name={ScreenRoutes.HOME} component={HomeScreen} />
                <Stack.Screen name={ScreenRoutes.SET_PICKUP_LOCATION} component={SetPickUpLocation} />
                <Stack.Screen name={ScreenRoutes.CONFIRM_BOOKING} component={ConfirmBookingScreen} />
                <Stack.Screen name={ScreenRoutes.WALK_SUMMARY} component={WalkSummary} />
        </Stack.Navigator>
    )
}
const Navigation = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
                <NavigationContainer>
                    <AppStack />
                </NavigationContainer>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
        
    )
}

export default Navigation;

const styles = StyleSheet.create({})

