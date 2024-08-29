import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { setAvailability } from '../services/api';
import { errorHandler } from '../utils/errorHandler';

const SetAvailability = () => {
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState(null);

  const handleSetAvailability = async () => {
    try {
      await setAvailability({ dayOfWeek, startTime, endTime });
      // Handle success message
    } catch (err) {
      const userFriendlyMessage = errorHandler(err);
      setError(userFriendlyMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Availability</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <Picker
        selectedValue={dayOfWeek}
        onValueChange={(itemValue) => setDayOfWeek(itemValue)}
      >
        <Picker.Item label="Monday" value="Monday" />
        <Picker.Item label="Tuesday" value="Tuesday" />
        <Picker.Item label="Wednesday" value="Wednesday" />
        <Picker.Item label="Thursday" value="Thursday" />
        <Picker.Item label="Friday" value="Friday" />
        <Picker.Item label="Saturday" value="Saturday" />
        <Picker.Item label="Sunday" value="Sunday" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Start Time (HH:MM)"
        value={startTime}
        onChangeText={setStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time (HH:MM)"
        value={endTime}
        onChangeText={setEndTime}
      />
      <Button title="Set Availability" onPress={handleSetAvailability} />
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
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SetAvailability;
