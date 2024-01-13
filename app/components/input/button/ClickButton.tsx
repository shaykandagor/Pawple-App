import React from 'react'
import { Button, ButtonProps } from 'react-native-paper'

export interface ClickButtonProps extends Omit<ButtonProps, 'children'> {
  title: string
}

const ClickButton: React.FC<ClickButtonProps> = ({ title, mode = 'contained', ...props }) => (
  <Button mode={mode} {...props}>
    {title}
  </Button>
)

export default ClickButton
