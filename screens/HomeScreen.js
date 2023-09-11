import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from 'react-native-feather';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from '../theme';
import Categories from '../components/Categories';
import { featured } from '../constants';
import FeatureRow from '../components/FeatureRow';

export default function HomeScreen() {
  return (
    <SafeAreaView className='bg-white'>
      <StatusBar barStyle='dark-content' />

      {/* Search Bar */}
      <View className='flex-row items-center space-x-2 px-4 pb-2'>
        <View className='flex-row flex-1 items-center p-3 rounded-full border border-gray-300'>
          <Icon.Search
            height='25'
            width='25'
            stroke='gray'
          />
          <TextInput
            placeholder='Restaurant'
            className='flex-1 ml-2'
          />
          <View className='flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300'>
            <Icon.MapPin
              height='20'
              width='20'
              stroke='gray'
            />
            <Text className='text-gray-600'>New York</Text>
          </View>
        </View>

        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className='p-3 bg-gray-300 rounded-full'
        >
          <Icon.Sliders
            height='20'
            width='20'
            strokeWidth={2.5}
            stroke='white'
          />
        </View>
      </View>

      {/* Main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Categories />

        <View className='mt-5'>
          {[featured, featured, featured].map((item, index) => {
            return (
              <FeatureRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
