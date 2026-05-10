import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useState, useEffect } from 'react';
import { getProductByBarcode } from '../db';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    const product = await getProductByBarcode(data);
    if (product) {
      Alert.alert('Product Found', `You have ${product.name}`);
    } else {
      Alert.alert('Product Not Found', 'This product is not in your inventory');
    }
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && <Text>Scanning...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});