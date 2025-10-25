import AccountsScreen from '@/src/components/searchScreen/accounts';
import ApplyFilter from '@/src/components/searchScreen/applyFilter';
import CategoryScreen from '@/src/components/searchScreen/category';
import DiscoverScreen from '@/src/components/searchScreen/discoverScreen';
import Screen from '@/src/layout/Screen';
import { rS } from '@/src/lib/responsivehandler';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("Discover");


  // Category tabs
  const tabs = ["Discover", "Accounts", "Category"];

  const handleFilter =()=>{
 setSelectedTab("Filter");
  }

  const renderTab = (tab: string) => (
    <TouchableOpacity
      key={tab}
      onPress={() => setSelectedTab(tab)}
      className={`px-6 py-3 rounded-2xl mr-3 ${
        selectedTab === tab ? "bg-primary" : "bg-gray-100"
      }`}
    >
      <Text
        className={`font-medium ${
          selectedTab === tab ? "text-white" : "text-gray-600"
        }`}
        style={{ fontSize: rS(14) }}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Screen className="bg-white" scroll={true}>
      {/* Search Input */}
      <View className="px-4 py-3 bg-white">
        <View className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex-row items-center">
          <Ionicons name="search" size={20} color="#2E6939" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search..."
            placeholderTextColor="#9B9B9B"
            className="flex-1 ml-2"
            style={{ fontSize: rS(14) }}
          />
          <TouchableOpacity onPress={handleFilter}>
            <Ionicons name="options-outline" size={20} color="#2E6939" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs */}
      <View className="px-4 mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
        >
          {tabs.map(renderTab)}
        </ScrollView>
      </View>
      <View>
        <View>
          {selectedTab === "Discover" && <DiscoverScreen />}
          {selectedTab === "Accounts" && <AccountsScreen />}
          {selectedTab === "Category" && <CategoryScreen />}
          {selectedTab === "Filter" && <ApplyFilter />}

          {/* {selectedTab === "Category" && <CategoryResults />} */}
        </View>
      </View>
    </Screen>
  );
};

export default SearchPage;