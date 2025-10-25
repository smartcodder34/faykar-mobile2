// import React from 'react'
// import { Text, View } from 'react-native'

// const ApplyFilter = () => {
//   return (
//     <View>
//       <Text>ApplyFilter</Text>
//     </View>
//   )
// }

// export default ApplyFilter

import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const ApplyFilter = () => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("80");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports & Outdoors",
  ];

  const handleApplyFilter = () => {
    console.log("Filters Applied:", {
      location,
      minPrice,
      maxPrice,
      category: selectedCategory,
    });
    // Add your filter logic here
  };

  return (
    <ScrollView className="bg-white flex-1">
      <View className="px-5 pt-4">
        {/* Location Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Location
          </Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Enter Your Correct Location"
            placeholderTextColor="#9CA3AF"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
          />
        </View>

        {/* Price Range Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-green-700">
              Price Range
            </Text>
            <Text className="text-base font-medium text-gray-600">
              ${minPrice}-${maxPrice}
            </Text>
          </View>

          {/* Range Slider Visual */}
          <View className="mb-4">
            <View className="h-1 bg-gray-200 rounded-full">
              <View
                className="h-1 bg-green-700 rounded-full"
                style={{ width: "70%" }}
              />
            </View>
            <View className="flex-row justify-between mt-2">
              <View
                className="w-5 h-5 bg-green-700 rounded-full -mt-5"
                style={{ marginLeft: "0%" }}
              />
              <View
                className="w-5 h-5 bg-green-700 rounded-full -mt-5"
                style={{ marginRight: "30%" }}
              />
            </View>
          </View>

          {/* Min Max Inputs */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <TextInput
                value={minPrice}
                onChangeText={setMinPrice}
                placeholder="Min"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
                className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
              />
            </View>
            <View className="flex-1">
              <TextInput
                value={maxPrice}
                onChangeText={setMaxPrice}
                placeholder="Max"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
                className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
              />
            </View>
          </View>
        </View>

        {/* Category Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Category
          </Text>

          <TouchableOpacity
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex-row items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3"
          >
            <Text className="text-base text-gray-900">{selectedCategory}</Text>
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
            <View className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
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

        {/* Apply Filter Button */}
        <TouchableOpacity
          onPress={handleApplyFilter}
          className="bg-green-700 rounded-full py-4 items-center mb-8"
          activeOpacity={0.8}
        >
          <Text className="text-white text-base font-semibold">
            Apply Filter
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ApplyFilter;


// import Slider from "@react-native-community/slider";
// import React, { useState } from "react";
// import {
//     ScrollView,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";

// const ApplyFilter = () => {
//   const [location, setLocation] = useState("");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(80);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const MIN_LIMIT = 0;
//   const MAX_LIMIT = 500;

//   const categories = [
//     "All",
//     "Electronics",
//     "Fashion",
//     "Home & Garden",
//     "Sports & Outdoors",
//   ];

//   const handleMinChange = (value) => {
//     const numValue = Math.max(MIN_LIMIT, Math.min(value, maxPrice - 1));
//     setMinPrice(numValue);
//   };

//   const handleMaxChange = (value) => {
//     const numValue = Math.min(MAX_LIMIT, Math.max(value, minPrice + 1));
//     setMaxPrice(numValue);
//   };

//   const handleMinTextChange = (text) => {
//     const value = parseInt(text) || MIN_LIMIT;
//     handleMinChange(value);
//   };

//   const handleMaxTextChange = (text) => {
//     const value = parseInt(text) || MIN_LIMIT;
//     handleMaxChange(value);
//   };

//   const handleApplyFilter = () => {
//     console.log("Filters Applied:", {
//       location,
//       minPrice,
//       maxPrice,
//       category: selectedCategory,
//     });
//     // Add your filter logic here
//   };

//   return (
//     <ScrollView className="bg-white flex-1">
//       <View className="px-5 pt-4">
//         {/* Location Section */}
//         <View className="mb-6">
//           <Text className="text-lg font-semibold text-gray-900 mb-3">
//             Location
//           </Text>
//           <TextInput
//             value={location}
//             onChangeText={setLocation}
//             placeholder="Enter Your Correct Location"
//             placeholderTextColor="#9CA3AF"
//             className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
//           />
//         </View>

//         {/* Price Range Section */}
//         <View className="mb-6">
//           <View className="flex-row justify-between items-center mb-4">
//             <Text className="text-lg font-semibold text-green-700">
//               Price Range
//             </Text>
//             <Text className="text-base font-medium text-gray-600">
//               ${minPrice}-${maxPrice}
//             </Text>
//           </View>

//           {/* Range Slider */}
//           <View className="mb-4 px-2">
//             {/* Min Slider */}
//             <View className="relative mb-2">
//               <Slider
//                 value={minPrice}
//                 onValueChange={handleMinChange}
//                 minimumValue={MIN_LIMIT}
//                 maximumValue={MAX_LIMIT}
//                 step={1}
//                 minimumTrackTintColor="#15803D"
//                 maximumTrackTintColor="#E5E7EB"
//                 thumbTintColor="#15803D"
//               />
//             </View>

//             {/* Max Slider */}
//             <View className="relative -mt-10">
//               <Slider
//                 value={maxPrice}
//                 onValueChange={handleMaxChange}
//                 minimumValue={MIN_LIMIT}
//                 maximumValue={MAX_LIMIT}
//                 step={1}
//                 minimumTrackTintColor="#15803D"
//                 maximumTrackTintColor="#E5E7EB"
//                 thumbTintColor="#15803D"
//               />
//             </View>
//           </View>

//           {/* Min Max Inputs */}
//           <View className="flex-row gap-4">
//             <View className="flex-1">
//               <TextInput
//                 value={minPrice.toString()}
//                 onChangeText={handleMinTextChange}
//                 placeholder="Min"
//                 keyboardType="numeric"
//                 placeholderTextColor="#9CA3AF"
//                 className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
//               />
//             </View>
//             <View className="flex-1">
//               <TextInput
//                 value={maxPrice.toString()}
//                 onChangeText={handleMaxTextChange}
//                 placeholder="Max"
//                 keyboardType="numeric"
//                 placeholderTextColor="#9CA3AF"
//                 className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
//               />
//             </View>
//           </View>
//         </View>

//         {/* Category Section */}
//         <View className="mb-8">
//           <Text className="text-lg font-semibold text-gray-900 mb-3">
//             Category
//           </Text>

//           <TouchableOpacity
//             onPress={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex-row items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3"
//           >
//             <Text className="text-base text-gray-900">{selectedCategory}</Text>
//             <View
//               className={`transform ${
//                 isDropdownOpen ? "rotate-180" : "rotate-0"
//               }`}
//             >
//               <View className="w-3 h-3 border-b-2 border-r-2 border-gray-400 transform rotate-45 -mt-1" />
//             </View>
//           </TouchableOpacity>

//           {/* Dropdown Menu */}
//           {isDropdownOpen && (
//             <View className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
//               {categories.map((category, index) => (
//                 <TouchableOpacity
//                   key={category}
//                   onPress={() => {
//                     setSelectedCategory(category);
//                     setIsDropdownOpen(false);
//                   }}
//                   className={`px-4 py-3 ${
//                     index !== categories.length - 1
//                       ? "border-b border-gray-200"
//                       : ""
//                   }`}
//                 >
//                   <Text className="text-base text-gray-900">{category}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Apply Filter Button */}
//         <TouchableOpacity
//           onPress={handleApplyFilter}
//           className="bg-green-700 rounded-full py-4 items-center mb-8"
//           activeOpacity={0.8}
//         >
//           <Text className="text-white text-base font-semibold">
//             Apply Filter
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default ApplyFilter;
