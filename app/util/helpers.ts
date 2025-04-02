export const calculateAge = (dob: Date): string => {
  const now = new Date()
  let years = now.getFullYear() - dob.getFullYear()
  let months = now.getMonth() - dob.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  if (years < 0) return 'Invalid date'

  return years > 0 ? `${years} years ${months} months` : `${months} months`
}

export const getFormFileFromUri = (uri: string) => {
  const filename = uri.split('/').pop()

  let fileExt = filename?.split('.').pop()

  const mimeType = `image/${fileExt}`

  // const mimeType = Platform.OS === "ios" ? `image/jpg` : "image/jpeg";

  return {
    uri: uri,

    name: filename,

    type: mimeType
  }
}
