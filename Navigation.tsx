import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import {
  AboutScreen,
  AccountVerifyScreen,
  ConfirmBookingScreen,
  DetailsVerificationScreen,
  HomeScreen,
  LoginScreen,
  MyWalksScreen,
  PaymentMethodScreen,
  PetInfoScreen,
  PetRegisterScreen,
  PromotionDealsScreen,
  RegistrationScreen,
  SetPickUpLocationScreen,
  SubscriptionsScreen,
  SupportScreen,
  WalkSummaryScreen,
  WelcomeScreen
} from '@screens'

import { Colors } from '@util'
import CustomDrawer from './CustomDrawer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper'
import { theme } from '@util'
import { StyleSheet } from 'react-native'
import useSession from 'app/session/useSession'
import * as ScreenNames from 'app/screens/ScreenNames'

export type RootStackParamList = {
  DrawerGroup: undefined
  AccountVerification: undefined
  PetInformation: undefined
  PetRegistration: undefined
  DetailsVerification: undefined
  Home: undefined
  SetPickUpLocation: undefined
  ConfirmBooking: undefined
  WalkSummary: undefined
}

export type OpenRoutesParamList = {
  Login: undefined
  Registration: undefined
  Welcome: undefined
}

export type DrawerParamList = {
  Home: undefined
  PaymentMethods: undefined
  PromotionsAndDeals: undefined
  Subscriptions: undefined
  MyWalks: undefined
  Support: undefined
  About: undefined
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>
export type OpenRoutesNavigationProps = NativeStackNavigationProp<OpenRoutesParamList>

// Navigation Drawer
const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>()
const SecureStack = createStackNavigator<RootStackParamList>()
const OpenStack = createStackNavigator<OpenRoutesParamList>()

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  materialLight: theme
})

const DrawerGroup = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        drawerLabelStyle: styles.drawerLabel,
        drawerActiveBackgroundColor: Colors.lightGray as string,
        drawerActiveTintColor: Colors.primary as string,
        drawerInactiveBackgroundColor: Colors.white as string
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Screen
        name={ScreenNames.HOME}
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name="home-outline" size={35} color={Colors.darkGray} />
          )
        }}
      />
      <Screen
        name="PaymentMethods"
        component={PaymentMethodScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name="wallet-outline" size={35} color={Colors.darkGray} />
          )
        }}
      />
      <Screen
        name="PromotionsAndDeals"
        component={PromotionDealsScreen}
        options={{
          title: 'Promotions & Deals',
          drawerIcon: () => (
            <MaterialCommunityIcons name="tag-outline" size={35} color={Colors.darkGray} />
          )
        }}
      />
      <Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="ticket-percent-outline"
              size={35}
              color={Colors.darkGray}
            />
          )
        }}
      />
      <Screen
        name="MyWalks"
        component={MyWalksScreen}
        options={{
          title: 'My Walks',
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={35}
              color={Colors.darkGray}
            />
          )
        }}
      />
      <Screen
        name="Support"
        component={SupportScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="message-question-outline"
              size={35}
              color={Colors.darkGray}
            />
          )
        }}
      />
      <Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name="information-outline" size={35} color={Colors.darkGray} />
          )
        }}
      />
    </Navigator>
  )
}
const OpenRoutes = () => {
  return (
    <OpenStack.Navigator>
      <OpenStack.Screen name={ScreenNames.WELCOME} component={WelcomeScreen} />
      <OpenStack.Screen name={ScreenNames.REGISTRATION} component={RegistrationScreen} />
      <OpenStack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
    </OpenStack.Navigator>
  )
}

const RootStack = () => {
  return (
    <SecureStack.Navigator>
      <SecureStack.Screen
        name={ScreenNames.DRAWER_GROUP}
        component={DrawerGroup}
        options={{ headerShown: false }}
      />
      <SecureStack.Screen name={ScreenNames.ACCOUNT_VERIFICATION} component={AccountVerifyScreen} />
      <SecureStack.Screen name={ScreenNames.PET_INFORMATION} component={PetInfoScreen} />
      <SecureStack.Screen name={ScreenNames.PET_REGISTRATION} component={PetRegisterScreen} />
      <SecureStack.Screen
        name={ScreenNames.DETAILS_VERIFICATION}
        component={DetailsVerificationScreen}
      />
      <SecureStack.Screen
        name={ScreenNames.SET_PICKUP_LOCATION}
        component={SetPickUpLocationScreen}
      />
      <SecureStack.Screen name={ScreenNames.CONFIRM_BOOKING} component={ConfirmBookingScreen} />
      <SecureStack.Screen name={ScreenNames.WALK_SUMMARY} component={WalkSummaryScreen} />
    </SecureStack.Navigator>
  )
}
const Navigation = () => {
  const { authenticated } = useSession()
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={LightTheme}>
        {authenticated ? <RootStack /> : <OpenRoutes />}
      </NavigationContainer>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  drawerLabel: {
    marginLeft: -20,
    fontSize: 15,
    paddingVertical: 12
  }
})

export default Navigation
