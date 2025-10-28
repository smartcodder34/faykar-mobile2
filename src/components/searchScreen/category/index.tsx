import { useDiscoverCategory, usePopularSearched } from "@/src/api-services/discoversApi/discoverQuery";
import { useProductCategories } from "@/src/api-services/productsApi/productQuery";
import CustomSelect from "@/src/CustomComps/CustomSelect";
// import popularData from "@/src/mocks/populars.json";
import React, { useEffect, useState } from "react";
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

interface Item {
  title: string;
  value: string;
}

const CategoryScreen = () => {
  // Category states
  const [category1Open, setCategory1Open] = useState(false);
  const [category1Selected, setCategory1Selected] = useState<Item | null>(null);

  const getProductCategories = useProductCategories();

  const getDiscoverCategory = useDiscoverCategory(category1Selected);
  const getPopularSearched = usePopularSearched();


  const popularData = getPopularSearched?.data?.data;
  const getProductCategory = getDiscoverCategory?.data?.data?.products

  console.log("category1Selected", category1Selected);
  console.log(
    "getDiscoverCategory2000",
    getDiscoverCategory?.data?.data?.products
  );


  useEffect(() => {
    if (category1Selected) {
      getDiscoverCategory.refetch();
    }
  }, [category1Selected]);

  //category 1 data from api
  const newProductCategory = getProductCategories?.data?.data?.categories.map(
    (v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    }
  );

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

  const columns = splitIntoColumns(products);
  console.log("columns", columns);

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

  return (
    <View className="bg-white flex-1">
      {/* Category Header */}

      {category1Selected ? (
        <View>
          <View className="px-5 pt-4 pb-3">
            <Text className="text-xl font-bold text-green-700">Category</Text>
            <View className="flex-row items-center gap-2 mt-2">
              <View className="bg-green-600 px-4 py-2 rounded-full flex-row items-center">
                <Text className="text-white font-medium mr-2">
                  {category1Selected?.title}
                </Text>
                <TouchableOpacity
                  onPress={() => setCategory1Selected(null)}
                  className="ml-1"
                >
                  <View className="w-4 h-4 items-center justify-center">
                    <Text className="text-white font-bold text-sm">✕</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView className="flex-1 bg-white">
            {getProductCategory.length === 0 ? (
              <View className="items-center justify-center py-20">
                <Text className="text-gray-400 text-base">
                  No {category1Selected?.title} products found
                </Text>
              </View>
            ) : (
              <View
                className="flex-row px-4 bg-red-400 pt-10"
                style={{ gap: 16 }}
              >
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
      ) : (
        <View>
          <View className="px-5 pt-4 pb-3">
            <Text className="text-xl font-bold text-green-700">Category</Text>
          </View>
          {/* Dropdown */}
          <View className="px-5 mb-6">
            <CustomSelect
              label="Select Category"
              primary
              selected={category1Selected}
              setSelected={setCategory1Selected}
              openDropDown={category1Open}
              setOpenDropDown={setCategory1Open}
              placeholder="Choose category"
              // dataItem={category1Data}
              dataItem={newProductCategory}
            />
          </View>

          <View className="px-5 pb-3">
            <Text className="text-lg font-semibold text-gray-800">
              Popular Search
            </Text>
          </View>

          {/* Popular Search List */}
          <ScrollView className="px-5">
            {popularData?.length === 0 ? (
              <View className="items-center justify-center py-20">
                <Text className="text-gray-400 text-base">
                  No popular search
                </Text>
              </View>
            ) : (
              popularData?.map((item: any) => (
                <TouchableOpacity
                  key={item.id}
                  className="flex-row  my-1 items-center p-3 rounded-2xl bg-primary"
                >
                  {/* Product Image */}
                  {/* <Image
                    source={{ uri: item.image }}
                    className="w-20 h-20 rounded-lg bg-gray-200"
                  /> */}

                  {/* Product Info */}
                  <View className="  ">
                    <Text className="text-base font-semibold text-white mb-1">
                      {item.term}
                    </Text>
                    <Text className="text-sm text-white ">
                      total search: {item.total_searches}
                    </Text>
                  </View>

                  {/* Tag Badge */}
                  {/* <View className={`px-4 py-1.5 rounded-full ${item.tagColor}`}>
                    <Text className="text-xs font-semibold">{item.tag}</Text>
                  </View> */}
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CategoryScreen;
