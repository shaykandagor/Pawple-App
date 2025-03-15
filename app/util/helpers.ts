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


