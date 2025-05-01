import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';

const SupportScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@pawple.app');
  };

  const handleReportIssuePress = () => {
    Linking.openURL('mailto:support@pawple.app?subject=Reporting an Issue');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9fafb' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>Need Help? 🐾</Text>
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#555' }}>
        We're always ready to lend a paw!
        Reach out to us anytime if you have questions, feedback, or issues.
      </Text>

      <TouchableOpacity
        onPress={handleEmailPress}
        style={{ backgroundColor: '#4F46E5', padding: 15, borderRadius: 10, marginBottom: 15, width: '80%' }}
      >
        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>📧 Email Us</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleReportIssuePress}
        style={{ backgroundColor: '#22C55E', padding: 15, borderRadius: 10, marginBottom: 15, width: '80%' }}
      >
        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>🐶 Report an Issue</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Quick Help 📝</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>• How to book a walk</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>• Becoming a pet walker</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>• Payment & refund policies</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>• Safety and verification info</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 14, color: '#aaa', textAlign: 'center' }}>
          Pawple © 2025 - Making pet ownership easier every day 🐕
        </Text>
      </View>
    </ScrollView>
  );
};

export default SupportScreen;
