import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { addProduct } from '../db';

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');

  const handleAdd = async () => {
    if (!name || !barcode) {
      Alert.alert('Error', 'Please enter name and barcode');
      return;
    }
    try {
      await addProduct(name, barcode);
      Alert.alert('Success', 'Product added');
      setName('');
      setBarcode('');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Barcode already exists or error');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Product Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Barcode" value={barcode} onChangeText={setBarcode} style={styles.input} />
      <Button title="Add Product" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10 },
});