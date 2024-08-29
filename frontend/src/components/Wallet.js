import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getWallet, addFunds, getTransactionHistory } from '../services/api';
import { errorHandler } from '../utils/errorHandler';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWalletData();
    fetchTransactionHistory();
  }, []);

  const fetchWalletData = async () => {
    try {
      const data = await getWallet();
      setBalance(data.balance);
    } catch (err) {
      const userFriendlyMessage = errorHandler(err);
      setError(userFriendlyMessage);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const data = await getTransactionHistory();
      setTransactions(data);
    } catch (err) {
      const userFriendlyMessage = errorHandler(err);
      setError(userFriendlyMessage);
    }
  };

  const handleAddFunds = async () => {
    try {
      await addFunds({ amount: parseFloat(amount), transactionId: `txn_${Date.now()}` });
      fetchWalletData();
    } catch (err) {
      const userFriendlyMessage = errorHandler(err);
      setError(userFriendlyMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Balance: ${balance.toFixed(2)}</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Amount to Add"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Add Funds" onPress={handleAddFunds} />
      <View style={styles.transactionContainer}>
        <Text style={styles.subtitle}>Transaction History</Text>
        {transactions.map((txn, index) => (
          <Text key={index} style={styles.transaction}>
            {txn.type.toUpperCase()} - ${txn.amount.toFixed(2)} - {txn.status.toUpperCase()}
          </Text>
        ))}
      </View>
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
  transactionContainer: {
    marginTop: 20,
    width: '100%',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transaction: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Wallet;
