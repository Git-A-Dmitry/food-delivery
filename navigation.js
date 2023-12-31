import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      {/* Remove the header */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
        />
        <Stack.Screen
          name='Restaurant'
          component={RestaurantScreen}
        />
        <Stack.Screen
          name='Cart'
          options={{ presentation: 'modal' }}
          component={CartScreen}
        />
        <Stack.Screen
          name='Order'
          options={{ presentation: 'fullScreenModal' }}
          component={OrderScreen}
        />
        <Stack.Screen
          name='Delivery'
          options={{ presentation: 'fullScreenModal' }}
          component={DeliveryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
