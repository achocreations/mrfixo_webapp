import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createBooking } from '../services/api';
import { errorHandler } from '../utils/errorHandler';

const BookingScreen = ({ serviceId }) => {
  const [error, setError] = useState(null);

  const handleBooking = async () => {
    try {
      await createBooking({ serviceId });
      // Handle successful booking
    } catch (err) {
      const userFriendlyMessage = errorHandler(err);
      setError(userFriendlyMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a Service</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Book Now" onPress={handleBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default BookingScreen;
