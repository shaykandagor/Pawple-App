import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { usePets } from 'app/api/pets'
import { Avatar } from 'react-native-paper'
import { BASE_URL } from 'app/util/constants'
import { Pet } from 'app/types'
import { Colors } from '@util'
import LoadingSkeleton from './loading/LoadingSkeleton'
import AvatarImage from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage'

const MyPets = () => {
  const { pets, mutate, isLoading, error } = usePets()
  if (isLoading) {
    return (
      <View>
        <LoadingSkeleton />
      </View>
    )
  }
  if (error) {
    return (
      <View>
        <Text>Errors</Text>
      </View>
    )
  }

  return (
    <View>
      <View>
        <Text style={styles.text}>Your Pets</Text>
      </View>

      <View style={styles.petProfileHome}>
        {pets.map((pet: Pet, index: number) => (
          <View style={styles.avatarContainer}>
            <Avatar.Image key={pet.id} size={100} source={{ uri: `${BASE_URL}/${pet.photoUrl}` }} />
          </View>
        ))}
        <View style={styles.avatarContainer} />
        <Avatar.Icon icon="plus" size={100} style={{ backgroundColor: Colors.lightGray }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: Colors.textDark,
    paddingVertical: 10
  },
  petProfileHome: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  avatarContainer: {
    marginHorizontal: 5d
  }
})

export default MyPets
