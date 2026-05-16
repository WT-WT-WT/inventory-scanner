import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getAllProducts } from '../db';

export default function InventoryScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const prods = await getAllProducts();
      setProducts(prods);
    };
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name} - {item.barcode}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});