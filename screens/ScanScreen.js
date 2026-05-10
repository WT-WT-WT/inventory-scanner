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
    if (scanned) {
      return;
    }

    setScanned(true);
    try {
      const product = await getProductByBarcode(data);
      const title = product ? 'Product Found' : 'Product Not Found';
      const message = product
        ? `You have ${product.name}`
        : 'This product is not in your inventory';

      Alert.alert(title, message, [
        {
          text: 'OK',
          onPress: () => setScanned(false),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Unable to check the product right now.', [
        {
          text: 'OK',
          onPress: () => setScanned(false),
        },
      ]);
    }
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