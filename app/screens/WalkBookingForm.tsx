import Form from '@components/form/Form'
import ConfirmBookingStep3 from '@components/walk_info/ConfirmBookingStep3'
import SetLocationStep2 from '@components/walk_info/SetLocationStep2'
import WalkBookingStep1 from '@components/walk_info/WalkBookingStep1'
import { Colors } from '@util'
import { mutate } from 'app/api/apiFetcher'
import { FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import * as YUP from 'yup'
import { useBookingApi } from 'app/api/booking'
import { Booking } from 'app/types'

type WalkBookingFormProps = {
  navigation: any
  route?: any
}

interface FormValues {
  pickupAddress: {
    lat: number
    lng: number
    address: string
  }
  instructions?: string
  visitPark: boolean
  bringDisposableBags: boolean
  petId: string
  durationId: string
  pickupTime: Date
}

const validationSchema = YUP.object().shape({
  pickupAddress: YUP.object().shape({
    lat: YUP.number().required('Latitude is required'),
    lng: YUP.number().required('Longitude is required'),
    address: YUP.string().required('Address is required')
  }),
  instructions: YUP.string().optional(),
  visitPark: YUP.boolean().required(),
  bringDisposableBags: YUP.boolean().required(),
  petId: YUP.string().label('pet').required(),
  durationId: YUP.string().label('duration').required(),
  pickupTime: YUP.date().label('pickup time').required()
})

const WalkBookingForm: React.FC<WalkBookingFormProps> = ({
  navigation,
  route
}) => {
  // The booking object is retrieved from the route parameters.
  // If the booking object is not found, it will be undefined.
  const booking: Booking | undefined = (route?.params as any)?.booking
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const { addBooking, updateBooking } = useBookingApi()

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }
  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = async (
    value: FormValues,
    { setErrors }: FormikHelpers<FormValues>
  ) => {
    setLoading(true)
    try {
      if (booking) {
        await updateBooking(booking.id, value)
      } else {
        await addBooking(value)
      }
      mutate('/bookings')
      navigation.goBack()
      // console.log('Booking value:', value)
    } catch (error: any) {
      if (error.response.status === 400) {
        const errors = await error.response.data
        const fieldErrors = Object.entries(errors).reduce(
          (prev, [key, value]) => {
            if (key === '_errors') {
              return prev
            }
            return {
              ...prev,
              [key]: ((value as any)._errors as string[]).join(';')
            }
          },
          {}
        )
        setErrors({ ...fieldErrors })
      } else {
        // TODO: Handle other errors other than validation
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form<FormValues>
        initialValue={{
          pickupAddress: {
            lat: 60.1100964,
            lng: 24.6890503,
            address: 'pickup address'
          },
          instructions: '',
          visitPark: false,
          bringDisposableBags: false,
          petId: '',
          durationId: '',
          pickupTime: new Date()
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {currentStep === 1 && <WalkBookingStep1 onNext={handleNext} />}
        {currentStep === 2 && (
          <SetLocationStep2 onNext={handleNext} onPrev={handleBack} />
        )}
        {currentStep === 3 && (
          <ConfirmBookingStep3 isSubmitting={loading} onPrev={handleBack} />
        )}
      </Form>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    padding: 20
  },
  doneButton: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  scheduleButton: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  bookButton: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  cardContainer: {
    justifyContent: 'flex-start'
  },
  heading: {
    alignItems: 'flex-start',
    marginBottom: 10
  },
  bookText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.textDark,
    paddingBottom: 15
  }
})

export default WalkBookingForm
