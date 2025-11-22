// import { Image } from 'expo-image';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const COLUMN_WIDTH = (width - 48) / 2; // 2 columns with padding

const ApplyFilterComp = ({ discoverCategoryMutation }:any) => {
  const products = [
    {
      id: 1,
      image: "https://example.com/burger.jpg",
      height: 200, // Tall
    },
    {
      id: 2,
      image: "https://example.com/jeans.jpg",
      height: 150, // Medium
    },
    {
      id: 3,
      image: "https://example.com/blazer.jpg",
      height: 180, // Medium-tall
    },
    {
      id: 4,
      image: "https://example.com/bananas.jpg",
      height: 150, // Medium
    },
    {
      id: 5,
      image: "https://example.com/shoes.jpg",
      height: 180, // Medium-tall
    },
    {
      id: 6,
      image: "https://example.com/strawberry.jpg",
      height: 180, // Medium-tall
    },
  ];
  // Split products into two columns for masonry layout
  const splitIntoColumns = (data: any[], numColumns: number = 2) => {
    const columns: any[][] = Array.from({ length: numColumns }, () => []);
    const columnHeights = Array(numColumns).fill(0);

    data.forEach((item) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columns[shortestColumnIndex].push(item);
      columnHeights[shortestColumnIndex] += item.height;
    });

    return columns;
  };

  const renderProductCard = (item: any) => (
    <TouchableOpacity
      key={item.id}
      className="bg-white rounded-2xl overflow-hidden mb-4"
      style={{ width: COLUMN_WIDTH }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: item.height }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const columns = splitIntoColumns(products);
  console.log("columns", columns);
  return (
    <View>
      <ScrollView className="flex-1 bg-white">
        {discoverCategoryMutation?.data?.data?.products?.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400 text-base">Nothing here yet</Text>
          </View>
        ) : (
          <View className="flex-row px-4 bg-red-400 pt-10" style={{ gap: 16 }}>
            {/* Left Column */}
            <View style={{ width: COLUMN_WIDTH }}>
              {columns[0]?.map((item) => renderProductCard(item))}
            </View>

            {/* Right Column */}
            <View style={{ width: COLUMN_WIDTH }}>
              {columns[1]?.map((item) => renderProductCard(item))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ApplyFilterComp