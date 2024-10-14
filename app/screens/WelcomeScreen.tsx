import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Colors } from '@util'
import { ClickButton, Logo, LogoText } from '@component'
import { RootStackParamList } from '../../Navigation'

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Logo width={200} height={200} />
        <LogoText width={120} height={120} />
        <Text style={styles.slogan}>
          Trustworthy pet walkers on demand. Tap, book, and enjoy stress-free strolls provided by a
          friendly walker.
        </Text>
      </View>

      <View style={styles.signInButtons}>
        <ClickButton
          icon="google"
          title="Sign in with Google"
          mode="outlined"
          onPress={() => console.log('Pressed')}
        />
        <ClickButton
          icon="apple"
          title="Sign in with Apple"
          mode="outlined"
          onPress={() => console.log('Pressed')}
        />
        <ClickButton
          mode="contained"
          onPress={() => navigation.navigate('Registration')}
          title="Create an account"
        />
      </View>

      <View style={styles.accountTextContainer}>
        <Text style={styles.label}>You already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.white
  },
  logoContainer: {
    paddingTop: 20,
    alignItems: 'center'
  },
  slogan: {
    padding: 20,
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center'
  },
  signInButtons: {
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  accountTextContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  label: {
    fontWeight: '400',
    color: Colors.primary
  },
  linkText: {
    color: Colors.primary,
    marginLeft: 5,
    fontWeight: 'bold'
  }
})

export default WelcomeScreen
