import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { usePets } from 'app/api/pets'
import { Avatar } from 'react-native-paper'
import { BASE_URL } from 'app/util/constants'
import { Pet } from 'app/types'
import { Colors } from '@util'
import LoadingSkeleton from './loading/LoadingSkeleton'
import CustomError from './custom_error/CustomError'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { PET_REGISTRATION } from 'app/screens/ScreenNames'
import { useNavigation } from '@react-navigation/native'

const MyPets = () => {
  const navigation = useNavigation()
  const { pets, isLoading, error } = usePets()
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </View>
    )
  }
  if (error) {
    return (
      <View>
        <CustomError errorMessage={error.message} />;
      </View>
    )
  }

  return (
    <View>
      <View>
        <Text style={styles.text}>Your Pets</Text>
      </View>
      <ScrollView horizontal={true}> 
        <View style={styles.petProfileHome}>
          {pets.map((pet: Pet, index: number) => (
            <View key={pet.id} style={styles.avatarContainer}>
              <Avatar.Image size={100} source={{ uri: `${BASE_URL}/${pet.photoUrl}` }} />
            </View>
          ))}
          <View style={styles.avatarContainer} />
          <TouchableOpacity onPress={() => navigation.navigate(PET_REGISTRATION)}>
            <Avatar.Icon icon="plus" size={100} style={{ backgroundColor: Colors.lightGray }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: Colors.textDark,
    paddingVertical: 10
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15
  },
  petProfileHome: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1
  },
  avatarContainer: {
    marginHorizontal: 5
  }
})

export default MyPets
