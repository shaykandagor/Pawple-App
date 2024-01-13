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

export type RootStackParamList = {
  DrawerGroup: undefined
  Welcome: undefined
  Login: undefined
  AccountVerification: undefined
  PetInformation: undefined
  PetRegistration: undefined
  DetailsVerification: undefined
  Home: undefined
  SetPickUpLocation: undefined
  ConfirmBooking: undefined
  WalkSummary: undefined
}

export type DrawerParamList = {
  PaymentMethods: undefined
  PromotionsAndDeals: undefined
  Subscriptions: undefined
  MyWalks: undefined
  Support: undefined
  About: undefined
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>

// Navigation Drawer
const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>()
const Stack = createStackNavigator<RootStackParamList>()

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

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DrawerGroup" component={DrawerGroup} options={{ headerShown: false }} />
      <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'AccountVerification'} component={AccountVerifyScreen} />
      <Stack.Screen name={'PetInformation'} component={PetInfoScreen} />
      <Stack.Screen name={'PetRegistration'} component={PetRegisterScreen} />
      <Stack.Screen name={'DetailsVerification'} component={DetailsVerificationScreen} />
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'SetPickUpLocation'} component={SetPickUpLocationScreen} />
      <Stack.Screen name={'ConfirmBooking'} component={ConfirmBookingScreen} />
      <Stack.Screen name={'WalkSummary'} component={WalkSummaryScreen} />
    </Stack.Navigator>
  )
}
const Navigation = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={LightTheme}>
        <RootStack />
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
