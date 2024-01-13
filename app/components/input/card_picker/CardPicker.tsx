import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '@util'
import { FormikErrors } from 'formik'
import { Error } from '@components/error/Error'

export interface CardPickerProps<R> {
  label?: string
  items?: R[]
  value: R
  onValueChange: (value: R) => void
  titleExtractor: (item: R) => string
  identifierKey: keyof R
  subTitleExtractor?: (item: R) => string | undefined
  renderTrailer?: (item: R, props: { size: number }) => React.ReactNode
  error?: FormikErrors<unknown>
}

const CardPicker = <R,>({
  label,
  items = [],
  value,
  onValueChange,
  titleExtractor,
  identifierKey,
  subTitleExtractor,
  renderTrailer,
  error
}: CardPickerProps<R>) => (
  <View>
    {label && <Text>{label}</Text>}
    <FlatList
      data={items}
      keyExtractor={titleExtractor}
      renderItem={({ item }) => (
        <Card style={styles.card} onPress={() => onValueChange(item)}>
          <Card.Title
            title={titleExtractor(item)}
            titleStyle={styles.cardTitle}
            subtitle={subTitleExtractor ? subTitleExtractor(item) : undefined}
            subtitleStyle={styles.cardSubtitle}
            left={
              value?.[identifierKey] === item[identifierKey]
                ? (props) => (
                    <MaterialCommunityIcons
                      {...props}
                      name="check-circle"
                      color={Colors.primaryDark}
                      size={30}
                    />
                  )
                : undefined
            }
            right={renderTrailer ? (props) => renderTrailer(item, props) : undefined}
          />
        </Card>
      )}
    />
    {error && <Error error={error.toString()} />}
  </View>
)

export default CardPicker

const styles = StyleSheet.create({
  card: {
    paddingRight: 30,
    margin: 10,
    elevation: 5,
    backgroundColor: Colors.white
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textDark
  },
  cardSubtitle: {
    fontSize: 16,
    color: Colors.primary
  }
})
