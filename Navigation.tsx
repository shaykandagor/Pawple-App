import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import {
  AboutScreen,
  DetailsVerificationScreen,
  HomeScreen,
  LoginScreen,
  PaymentMethodScreen,
  PetRegisterScreen,
  PromotionDealsScreen,
  RegistrationScreen,
  SubscriptionsScreen,
  SupportScreen,
  UpdateProfileScreen,
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
import UserRegistrationScreen from 'app/screens/UserRegistrationScreen'
import WalkBookingForm from 'app/screens/WalkBookingForm'
import MyBookings from '@components/MyBookings'
import BookingDetailsScreen from 'app/screens/BookingDetailsScreen'
import MyWalks from 'app/screens/MyWalks'
import ProgressWalksScreen from 'app/screens/ProgressWalksScreen'

export type RootStackParamList = {
  DrawerGroup: undefined
  UpdateProfile: undefined
  ProgressWalks: undefined
  PetInformation: undefined
  PetRegistration: undefined
  WalkBooking: undefined
  DetailsVerification: undefined
  Home: undefined
  ConfirmBooking: undefined
  WalkSummary: undefined
  BookingDetails: undefined
}

export type OpenRoutesParamList = {
  Login: undefined
  Registration: undefined
  UserRegistration: undefined
  Welcome: undefined
}

export type DrawerParamList = {
  Home: undefined
  PaymentMethods: undefined
  PromotionsAndDeals: undefined
  Subscriptions: undefined
  MyBookings: undefined
  MyWalks: undefined
  Support: undefined
  About: undefined
}

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>
export type OpenRoutesNavigationProps =
  NativeStackNavigationProp<OpenRoutesParamList>

// Navigation Drawer
const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>()
const SecureStack = createStackNavigator<RootStackParamList>()
const OpenStack = createStackNavigator<OpenRoutesParamList>()

const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  materialLight: theme
})

const DrawerGroup = () => {
  const {
    session: { user }
  } = useSession()
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
            <MaterialCommunityIcons
              name="home-outline"
              size={35}
              color={Colors.darkGray}
            />
          )
        }}
      />
      {/*       <Screen
        name={ScreenNames.PAYMENT_METHODS}
        component={PaymentMethodScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="wallet-outline"
              size={35}
              color={Colors.darkGray}
            />
          )
        }}
      />
      <Screen
        name={ScreenNames.PROMOTIONS_AND_DEALS}
        component={PromotionDealsScreen}
        options={{
          title: 'Promotions & Deals',
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="tag-outline"
              size={35}
              color={Colors.darkGray}
            />
          )
        }}
      />
      <Screen
        name={ScreenNames.SUBSCRIPTIONS}
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
      /> */}
      <Screen
        name={ScreenNames.MY_BOOKINGS}
        component={MyBookings}
        options={{
          title: 'Bookings',
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={35}
              color={Colors.darkGray}
            />
          )
        }}
      />
      {!user?.owner && (
        <Screen
          name={ScreenNames.MY_WALKS}
          component={MyWalks}
          options={{
            title: 'Walks',
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="dog-service"
                size={35}
                color={Colors.darkGray}
              />
            )
          }}
        />
      )}
      <Screen
        name={ScreenNames.SUPPORT}
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
        name={ScreenNames.ABOUT}
        component={AboutScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="information-outline"
              size={35}
              color={Colors.darkGray}
            />
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
      <OpenStack.Screen
        name={ScreenNames.REGISTRATION}
        component={RegistrationScreen}
      />
      <OpenStack.Screen
        name={ScreenNames.USER_REGISTRATION}
        component={UserRegistrationScreen}
      />
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
      <SecureStack.Screen
        name={ScreenNames.UPDATE_PROFILE}
        component={UpdateProfileScreen}
      />
      <SecureStack.Screen
        name={ScreenNames.PROGRESS_WALKS}
        component={ProgressWalksScreen}
      />
      <SecureStack.Screen
        name={ScreenNames.PET_REGISTRATION}
        component={PetRegisterScreen}
      />
      <SecureStack.Screen
        name={ScreenNames.WALK_BOOKING}
        component={WalkBookingForm}
      />
      <SecureStack.Screen
        name={ScreenNames.BOOKING_DETAILS}
        component={BookingDetailsScreen}
      />
      <SecureStack.Screen
        name={ScreenNames.DETAILS_VERIFICATION}
        component={DetailsVerificationScreen}
      />
      <SecureStack.Screen
        name={ScreenNames.WALK_SUMMARY}
        component={WalkSummaryScreen}
      />
    </SecureStack.Navigator>
  )
}
const Navigation = () => {
  const {
    session: { authenticated }
  } = useSession()
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
