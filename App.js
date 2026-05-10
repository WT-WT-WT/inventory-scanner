import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { initDB } from './db';
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import AddProductScreen from './screens/AddProductScreen';
import InventoryScreen from './screens/InventoryScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const initializeDB = async () => {
      await initDB();
    };
    initializeDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
