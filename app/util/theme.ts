import { DefaultTheme, MD3Theme } from 'react-native-paper'
import { Colors } from '@util'
export const theme: MD3Theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary as string,
    secondary: Colors.logo as string,
    surfaceVariant: '#fff'
  }
}
