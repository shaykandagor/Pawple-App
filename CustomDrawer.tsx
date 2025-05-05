import Users from '@components/Users'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer'
import { Colors } from '@util'
import useSession from 'app/session/useSession'
import React from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import ClickButton from './app/components/input/button/ClickButton'
import { useNavigation } from '@react-navigation/native'
import { UPDATE_PROFILE } from 'app/screens/ScreenNames'

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const {
    logOut,
    session: { user }
  } = useSession()
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.skyBlue }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate(UPDATE_PROFILE as never)}
        >
          <Users />
        </TouchableOpacity>
        <View style={styles.itemContainer}>
          <DrawerItemList {...props} />
          <View style={styles.loginView}>
            <ClickButton
              title="Log Out"
              onPress={() =>
                Alert.alert('Log out', 'Are you sure you want to log out?', [
                  { text: 'Cancel' },
                  { text: 'Log out', onPress: logOut }
                ])
              }
            />
          </View>
        </View>
        {!user?.walker && (
          <View style={styles.bottomView}>
            <Text
              style={{
                fontSize: 15,
                paddingBottom: 10,
                color: Colors.textDark,
                fontWeight: '600',
                alignSelf: 'center'
              }}
            >
              Earn money on your schedule
            </Text>
            <ClickButton
              title="Become a walker"
              onPress={() => console.log('Pressed: Become a walker')}
            />
          </View>
        )}
      </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
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
    borderRadius: 10,
    marginBottom: 10
  },
  loginView: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginBottom: 10
  }
})
