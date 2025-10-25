// import React from 'react'
// import { Text, View } from 'react-native'

// const CategoryScreen = () => {
//   return (
//     <View>
//       <Text>CategoryScreen</Text>
//     </View>
//   )
// }

// export default CategoryScreen


import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const CategoryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports & Outdoors",
  ];

  const popularSearches = [
    {
      id: 1,
      name: "Lunillo Hills Jacket",
      searches: "1.6k search today",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200",
      tag: "Hot",
      tagColor: "bg-red-100 text-red-500",
    },
    {
      id: 2,
      name: "Pineapple",
      searches: "1k search today",
      image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=200",
      tag: "New",
      tagColor: "bg-orange-100 text-orange-500",
    },
    {
      id: 3,
      name: "Redill the Backpack",
      searches: "1.23k search today",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
      tag: "Popular",
      tagColor: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      name: "Smoke Fish",
      searches: "1.1k search today",
      image: "https://images.unsplash.com/photo-1559346546-d0e38ff8c632?w=200",
      tag: "New",
      tagColor: "bg-orange-100 text-orange-500",
    },
  ];

  return (
    <View className="bg-white flex-1">
      {/* Category Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-xl font-bold text-green-700">Category</Text>
      </View>

      {/* Dropdown */}
      <View className="px-5 mb-6">
        <TouchableOpacity
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex-row items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3"
        >
          <Text
            className={`text-base ${
              selectedCategory ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {selectedCategory || "Select"}
          </Text>
          <View
            className={`transform ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <View className="w-3 h-3 border-b-2 border-r-2 border-gray-400 transform rotate-45 -mt-1" />
          </View>
        </TouchableOpacity>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <View className="absolute top-16 left-5 right-5 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category}
                onPress={() => {
                  setSelectedCategory(category);
                  setIsDropdownOpen(false);
                }}
                className={`px-4 py-3 ${
                  index !== categories.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <Text className="text-base text-gray-900">{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Popular Search */}
      <View className="px-5 pb-3">
        <Text className="text-lg font-semibold text-gray-800">
          Popular Search
        </Text>
      </View>

      {/* Popular Search List */}
      <ScrollView className="px-5">
        {popularSearches.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center mb-4"
          >
            {/* Product Image */}
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20 rounded-lg bg-gray-200"
            />

            {/* Product Info */}
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold text-gray-900 mb-1">
                {item.name}
              </Text>
              <Text className="text-sm text-gray-400">{item.searches}</Text>
            </View>

            {/* Tag Badge */}
            <View className={`px-4 py-1.5 rounded-full ${item.tagColor}`}>
              <Text className="text-xs font-semibold">{item.tag}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryScreen;