import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Scan Product" onPress={() => navigation.navigate('Scan')} />
      <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
      <Button title="View Inventory" onPress={() => navigation.navigate('Inventory')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
});