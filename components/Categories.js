import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
// import { categories } from '../constants';
import { getCategories } from '../api';
import { urlFor } from '../sanity';

export default function Categories({ onCategorySelect }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      // console.log('data: ', data[0]);
      setCategories(data);
    });
  }, []);

  return (
    <View className='mt-4'>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className='overflow-visible'
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((category, index) => {
          let isActive = category._id == activeCategory;
          let btnClass = isActive ? ' bg-gray-400' : ' bg-gray-200';
          let textClass = isActive ? ' font-semibold text-gray-800' : ' text-gray-500';

          return (
            <View
              key={index}
              className='flex justify-center items-center mr-5'
            >
              <TouchableOpacity
                onPress={() => {
                  setActiveCategory(category._id);
                  onCategorySelect(category.name);
                }}
                className={'p-1 rounded-full shadow-md bg-gray-200 ' + btnClass}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  // source={category.image}
                  source={{ uri: urlFor(category.image).url() }}
                />
              </TouchableOpacity>
              <Text className={'text-sm ' + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
