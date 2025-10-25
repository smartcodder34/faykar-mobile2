// import React from 'react'
// import { Text, View } from 'react-native'

// const CategoryResults = () => {
//   return (
//     <View>
//       <Text>CategoryResults</Text>
//     </View>
//   )
// }

// export default CategoryResults

import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const CategoryResults = () => {
  const [selectedFilter, setSelectedFilter] = useState("Pants");

  const filters = ["All", "Pants", "Shirts", "Shoes", "Accessories"];

  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
      height: "h-64",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
      height: "h-44",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      height: "h-44",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400",
      height: "h-48",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400",
      height: "h-32",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
      height: "h-44",
    },
  ];

  const removeFilter = () => {
    setSelectedFilter("All");
  };

  return (
    <View className="bg-white flex-1">
      {/* Category Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-xl font-bold text-gray-900">Category</Text>
      </View>

      {/* Filter Tags */}
      <View className="px-5 mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {filters.map((filter) => {
              const isActive = filter === selectedFilter;
              const isAll = filter === "All";

              if (isAll) {
                return (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-full border ${
                      isActive
                        ? "bg-white border-gray-300"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <Text className="text-sm font-medium text-gray-700">
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              }

              if (isActive) {
                return (
                  <View
                    key={filter}
                    className="flex-row items-center bg-green-700 px-4 py-2 rounded-full"
                  >
                    <Text className="text-sm font-medium text-white mr-2">
                      {filter}
                    </Text>
                    <TouchableOpacity onPress={removeFilter}>
                      <View className="w-4 h-4">
                        <View className="absolute w-full h-0.5 bg-white transform rotate-45 top-1.5" />
                        <View className="absolute w-full h-0.5 bg-white transform -rotate-45 top-1.5" />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }

              return (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setSelectedFilter(filter)}
                  className="px-4 py-2 rounded-full border border-gray-300 bg-white"
                >
                  <Text className="text-sm font-medium text-gray-700">
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Products Grid */}
      <ScrollView className="flex-1 px-5">
        <View className="flex-row flex-wrap justify-between">
          {/* Left Column */}
          <View className="w-[48%]">
            {products
              .filter((_, index) => index % 2 === 0)
              .map((product) => (
                <TouchableOpacity key={product.id} className="mb-4">
                  <Image
                    source={{ uri: product.image }}
                    className={`w-full ${product.height} rounded-2xl bg-gray-200`}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
          </View>

          {/* Right Column */}
          <View className="w-[48%]">
            {products
              .filter((_, index) => index % 2 !== 0)
              .map((product) => (
                <TouchableOpacity key={product.id} className="mb-4">
                  <Image
                    source={{ uri: product.image }}
                    className={`w-full ${product.height} rounded-2xl bg-gray-200`}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryResults;