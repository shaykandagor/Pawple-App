interface ImagePickerProps {
  size?: number
  backgroundColor?: string
  iconColor?: string
  image?: string
  onImageChange?: (image: string) => void
  onRequestDelete?: () => void
  label?: string
  error?: string
}

interface FormImagePickerProps {
  size?: number
  backgroundColor?: string
  iconColor?: string
  name: string
  label?: string
  helpText?: string
}

interface ImagePickerEditButtonProps {
  size: number
  backgroundColor?: string
  iconColor?: string
  onPress?: () => void
}
