import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClickButton from '../components/input/button/ClickButton'
import { DrawerParamList, RootStackParamList } from '../../Navigation'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps } from '@react-navigation/native'

type Props = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'PaymentMethods'>,
  NativeStackScreenProps<RootStackParamList>
>
const PaymentMethods: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>PaymentMethods</Text>
      <ClickButton
        mode="contained"
        title="Welcome Screen"
        onPress={() => {
          navigation.navigate('Welcome')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PaymentMethods
