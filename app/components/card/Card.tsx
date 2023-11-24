import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {Card, Paragraph, Title} from 'react-native-paper'

interface CardProps {
  title?: string,
  subTitle?: string,
  content?: string
  mode: 'elevated' | 'outlined' | 'contained'
  image: {uri: string} | string;
}

const CustomCard: React.FC<CardProps> = ({title, subTitle, mode, content, image}) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Card mode={mode}>
        <Card.Cover source={typeof image === 'string' ? {uri: image} : image} />
        <Card.Content>
          <Title>{title}</Title>
          <Paragraph>{content}</Paragraph>
          <Text>{subTitle}</Text>
        </Card.Content>
      </Card>

    </TouchableOpacity>
  )
}

export default CustomCard

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    width: 400,
    height: 100,
  },
})
