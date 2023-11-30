import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WelcomeScreen from './app/screens/WelcomeScreen';
import AccountVerifyScreen from './app/screens/AccountVerifyScreen';
import LoginScreen from './app/screens/LoginScreen';
import PetRegisterScreen from './app/screens/PetRegisterationScreen';
import PetInfoScreen from './app/screens/PetInfoScreen';
import DetailsVerifyScreen from './app/screens/DetailsVerificationScreen';
import HomeScreen from './app/screens/HomeScreen';
import Navigation from './Navigation';
import BottomSheetComponent from './app/components/BottomSheetComponent';
import SetPickUpScreen from './app/screens/SetPickUpScreen';

const App = () => {
  return (
    <BottomSheetComponent />

  );
};

export default App;
