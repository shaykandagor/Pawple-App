import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Colors } from '@util'
const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Pawple</Text>
      <Text style={styles.paragraph}>
        Pawple is a community-driven pet walking service designed for modern pet
        owners. Our app offers fast, reliable, and flexible pet walking
        solutions across Helsinki. With verified walkers, real-time GPS
        tracking, and seamless booking, we make pet ownership more manageable
        and stress-free.
      </Text>

      <Text style={styles.sectionTitle}>Our Mission</Text>
      <Text style={styles.paragraph}>
        To create a trusted, friendly community that connects pet owners with
        responsible walkers, ensuring pets get the care, exercise, and
        companionship they deserve — anytime, anywhere.
      </Text>

      <Text style={styles.sectionTitle}>Key Features</Text>
      <Text style={styles.paragraph}>
        • On-demand walk booking{'\n'}• Verified walkers and safety checks{'\n'}
        • Real-time GPS walk tracking{'\n'}• Secure payments{'\n'}• Community
        events and local connections
      </Text>

      <Text style={styles.sectionTitle}>Future Vision</Text>
      <Text style={styles.paragraph}>
        Pawple is evolving! Soon, we'll introduce new services like pet
        grooming, daycare, AI-assisted walker matching, and international
        expansion to bring Pawple to more communities worldwide.
      </Text>

      <Text style={styles.footer}>
        Thank you for being part of the Pawple family!
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    color: Colors.primary
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.black,
  },
  footer: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 30,
    textAlign: 'center',
    color: Colors.primaryDark
  }
})

export default AboutScreen
