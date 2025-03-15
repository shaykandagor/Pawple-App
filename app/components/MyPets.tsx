import {useNavigation} from '@react-navigation/native'
import {Colors} from '@util'
import {usePets} from 'app/api/pets'
import {PET_REGISTRATION} from 'app/screens/ScreenNames'
import {Pet} from 'app/types'
import {BASE_URL} from 'app/util/constants'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler'
import {Avatar} from 'react-native-paper'
import CustomError from './custom_error/CustomError'
import LoadingSkeleton from './loading/LoadingSkeleton'

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
        <CustomError errorMessage={error.message} />
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
            <TouchableOpacity key={pet.id} style={styles.avatarContainer} onPress={() => navigation.navigate(PET_REGISTRATION, { pet })}>
              <Avatar.Image size={100} source={{ uri: `${BASE_URL}/${pet.photoUrl}` }} />
              <Text style={styles.petName}>{pet.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => navigation.navigate(PET_REGISTRATION)}
          >
            <Avatar.Icon icon="plus" size={100} style={{ backgroundColor: Colors.lightGray }} />
            <Text style={styles.addNewPetText}>Add New Pet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
    paddingVertical: 15
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
    marginHorizontal: 10, // Add some horizontal margin
    alignItems: 'center', // Center items horizontally
    padding: 10, // Add padding
    borderRadius: 10 // Round corners
  },
  petName: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginTop: 5,
    color: Colors.textDark
  },
  addNewPetText: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'semibold'
  }
})

export default MyPets
