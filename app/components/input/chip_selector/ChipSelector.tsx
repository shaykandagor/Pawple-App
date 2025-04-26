import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Chip } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

interface ChipSelectorProps {
  options: string[]
  selectedOptions: string[]
  onSelect: (selected: string[]) => void
  mode: 'flat' | 'outlined'
  icon: IconSource
}

const ChipSelector: React.FC<ChipSelectorProps> = ({
  options,
  selectedOptions,
  onSelect,
  mode,
  icon
}) => {
  const handleChipPress = (option: string) => {
    const isSelected = selectedOptions.includes(option)
    if (isSelected) {
      // Deselect the option
      onSelect(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      )
    } else {
      // Select the option
      onSelect([...selectedOptions, option])
    }
  }

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <Chip
          key={option}
          mode="flat"
          // icon="check"
          style={[
            styles.chip,
            {
              backgroundColor: selectedOptions.includes(option)
                ? 'purple'
                : 'lightgray'
            }
          ]}
          onPress={() => handleChipPress(option)}
        >
          {option}
        </Chip>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  chip: {
    margin: 5
  }
})

export default ChipSelector
