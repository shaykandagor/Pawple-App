import { Colors } from '@util'
import { useAuth } from 'app/api/auth'
import { User } from 'app/types/session'
import { BASE_URL } from 'app/util/constants'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, Button, Text } from 'react-native-paper'
import CustomError from './custom_error/CustomError'
import LoadingSkeleton from './loading/LoadingSkeleton'
import useSecureStore from 'app/hooks/useSecureStore'

const Users = () => {
  const { getUserByToken } = useAuth()
  const { value: token } = useSecureStore('token', null) // Use useSecureStore to retrieve the token
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Wait until the token is available
        if (!token) {
          return // Exit early if token is null
        }
        const response = await getUserByToken(token)
        setUser(response.data) // Adjust this based on the actual response structure
      } catch (err: any) {
        console.error('Error fetching user profile:', err)
        setError(err.response?.data?.message || 'Failed to fetch user profile')
      }
    }

    fetchUser()
  }, [token]) // Add token as a dependency to re-fetch when it changes

  if (error) {
    return <CustomError errorMessage={error} />
  }

  if (!user) {
    return (
      <View style={styles.loading}>
        <LoadingSkeleton />
      </View>
    )
  }

  return (
    <View style={styles.profileContainer}>
      <Avatar.Image
        size={100}
        source={{
          uri: user.photoUrl
            ? `${BASE_URL}/users/${user.photoUrl}`
            : 'https://picsum.photos/seed/picsum/200/300'
        }}
        style={styles.profileImage}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.profileName}>{user.fullName}</Text>
        <Text style={styles.profile}>{user.username}</Text>
        <Button mode="text">Edit Profile</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15
  },
  profileContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: Colors.white,
    paddingVertical: 20
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginHorizontal: 10
  },
  profileName: {
    color: Colors.textDark,
    fontSize: 20,
    fontWeight: '600'
  },
  profile: {
    color: Colors.textDark,
    fontWeight: 'bold'
  }
})

export default Users
