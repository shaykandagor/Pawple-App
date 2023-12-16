import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClickButton from '../components/input/button/ClickButton'
import ScreenRoutes from '../../ScreenRoutes'

interface PaymentMethodsProps {
  navigation: any
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>PaymentMethods</Text>
      <ClickButton mode='contained' title='Welcome Screen' onPress={() => {navigation.navigate(ScreenRoutes.WELCOME)}}/>
    </View>
  )
}

export default PaymentMethods

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    },
})