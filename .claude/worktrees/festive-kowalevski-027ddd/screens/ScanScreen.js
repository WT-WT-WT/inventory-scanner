import { View, Text, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { getProductByBarcode } from '../db';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const scannedRef = useRef(false);

  useEffect(() => {
    (async () => {
      if (permission === null) {
        await requestPermission();
      }
    })();
  }, [permission, requestPermission]);

  const handleBarCodeScanned = async ({ data }) => {
    if (scannedRef.current) {
      return;
    }

    scannedRef.current = true;
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
          onPress: () => {
            scannedRef.current = false;
            setScanned(false);
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Unable to check the product right now.', [
        {
          text: 'OK',
          onPress: () => {
            scannedRef.current = false;
            setScanned(false);
          },
        },
      ]);
    }
  };

  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.requestText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera permission denied. Please enable it in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && <Text style={styles.scanningText}>Scanning...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  requestText: { fontSize: 18, color: '#333' },
  errorText: { fontSize: 16, color: 'red', textAlign: 'center', padding: 20 },
  scanningText: { fontSize: 16, color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10 },
});