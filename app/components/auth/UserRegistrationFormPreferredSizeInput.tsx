import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import FormItemPicker from '@components/input/item_picker/FormItemPicker'
import { Colors } from 'app/util/colors'
import { useFormikContext } from 'formik'

const UserRegistrationFormPreferredSizeInput = () => {
  const preferredSize = ['Small', 'Medium', 'Large']
  const { values } = useFormikContext()
  if ((values as any).role !== 'Walker') return null
  return (
    <View style={styles.itemPicker}>
      <FormItemPicker
        name="preferredSize"
        variant="outlined"
        label="Preferred Size"
        data={preferredSize}
        valueExtractor={(item) => item}
        labelExtractor={(item) => `${item}`}
        surfixIcon="chevron-down"
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: 'center',
              margin: 5,
              backgroundColor: Colors.lightGray,
              flexDirection: 'row',
              borderRadius: 10
            }}
          >
            <IconButton icon="camera" />
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default UserRegistrationFormPreferredSizeInput

const styles = StyleSheet.create({
  itemPicker: {
    marginBottom: 20 // Consistent margin for all inputs
  }
})
