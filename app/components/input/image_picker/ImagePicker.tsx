import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Alert
} from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ImagePickerEditButton from './ImagePickerEditButton'
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useCameraPermissions,
  launchCameraAsync
} from 'expo-image-picker'
import { HelperText, IconButton } from 'react-native-paper'

const ImagePicker: React.FC<ImagePickerProps> = ({
  size = 100,
  backgroundColor = 'gray',
  iconColor = 'white',
  image,
  onImageChange,
  onRequestDelete,
  label,
  error
}) => {
  const [status, requestPermission] = useCameraPermissions()
  const pickImage = () => {
    Alert.alert(
      'Choose an image',
      'How would you like to select the pet image?',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const permission = await requestPermission()
            if (permission.granted === false) {
              alert("You've refused to allow this app to access your camera!")
              return
            }
            const result = await launchCameraAsync({
              quality: 1,
              mediaTypes: MediaTypeOptions.Images,
              allowsEditing: true
            })
            if (!result.canceled && onImageChange instanceof Function) {
              onImageChange(result.assets[0].uri)
            }
          }
        },
        {
          text: 'Gallery',
          onPress: async () => {
            // No permissions request is necessary for launching the image library
            let result = await launchImageLibraryAsync({
              mediaTypes: MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1
            })

            if (!result.canceled && onImageChange instanceof Function) {
              onImageChange(result.assets[0].uri)
            }
          }
        }
      ]
    )
  }

  const [showImage, setShowImage] = useState<Boolean>(false)

  const toggleShowImage = () => setShowImage(!showImage)

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          {
            width: size,
            height: size,
            backgroundColor: backgroundColor,
            borderRadius: size ? size * 0.5 : 50
          },
          styles.container
        ]}
        onPress={image ? toggleShowImage : pickImage}
      >
        <>
          {image && (
            <ImagePickerEditButton
              size={size ? size * 0.24 : 24}
              onPress={pickImage}
            />
          )}
          <View
            style={{
              overflow: 'hidden',
              borderRadius: size ? size * 0.5 : 50
            }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: size, height: size }}
              />
            ) : (
              <MaterialCommunityIcons
                name="camera"
                size={size ? size * 0.75 : 75}
                style={styles.icon}
                color={iconColor}
              />
            )}
          </View>
        </>
      </TouchableOpacity>
      {label && <Text style={styles.label}>{label}</Text>}
      {error && <HelperText type="error">{error}</HelperText>}
      {showImage && (
        <Modal onRequestClose={toggleShowImage} animationType="slide">
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <IconButton
              icon={'delete'}
              iconColor="red"
              onPress={() => {
                if (onRequestDelete instanceof Function) onRequestDelete()
                toggleShowImage()
              }}
              style={{ alignSelf: 'flex-end' }}
            />
            <IconButton
              icon={'close'}
              onPress={toggleShowImage}
              style={{ alignSelf: 'flex-end' }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={{ uri: image }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}
    </View>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  icon: {},
  container: {
    alignItems: 'center',
    // padding: 10,
    justifyContent: 'center'
    // overflow: "hidden",
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  wrapper: {
    marginBottom: 16
  }
})
