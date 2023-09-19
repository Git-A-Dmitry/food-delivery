import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function OrderScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      // move to delivery screen
      navigation.navigate('Delivery');
    }, 5000);
  }, []);

  return (
    <View className='flex-1 bg-white justify-center items-center'>
      <Image
        source={require('../assets/images/delivery.gif')}
        className='h-80 w-80'
      />
      <Text className='mt-4 text-lg text-gray-700 font-semibold'>Please wait a second...</Text>
    </View>
  );
}
