import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from 'react-native-feather';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from '../theme';
import Categories from '../components/Categories';
import { featured } from '../constants';
import FeatureRow from '../components/FeatureRow';
import { getFeaturedRestaurants } from '../api';
// import restaurant from '../../backend/schemas/restaurant';

export default function HomeScreen() {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getFeaturedRestaurants().then((data) => {
      // console.log(data);
      setFeaturedRestaurants(data);
    });
  }, []);

  const filterRestaurantsByCategoryAndSearch = () => {
    // Filter featured restaurants based on the search input
    // Filtering by restaurant
    // const filteredRestaurants = featuredRestaurants.filter((item) => item.restaurants.some((restaurant) => restaurant.name.toLowerCase().includes(searchInput.toLowerCase())));

    // Filtering by dishes
    const filteredRestaurants = featuredRestaurants.filter((item) => item.restaurants.some((restaurant) => restaurant.dishes.some((dish) => dish.description.toLowerCase().includes(searchInput.toLowerCase()))));

    // If "All" category is selected (or no category is selected), return the filtered results
    if (!selectedCategory || selectedCategory.toLowerCase() === 'all') {
      return filteredRestaurants;
    }

    // Otherwise, further filter based on the selected category
    return filteredRestaurants.filter((item) => item.restaurants.some((restaurant) => restaurant.type.name === selectedCategory));
  };

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
            placeholder='Search by dish'
            className='flex-1 ml-2'
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
          />
          {/* <View className='flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300'>
            <Icon.MapPin
              height='20'
              width='20'
              stroke='gray'
            />
            <Text className='text-gray-600'>New York</Text>
          </View> */}
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
        <Categories onCategorySelect={(categoryName) => setSelectedCategory(categoryName)} />

        <View className='mt-5'>
          {filterRestaurantsByCategoryAndSearch().map((item, index) => {
            return (
              <FeatureRow
                key={index}
                title={item.name}
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
