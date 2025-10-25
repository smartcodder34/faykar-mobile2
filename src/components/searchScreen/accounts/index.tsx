// import React from 'react'
// import { Text, View } from 'react-native'

// const AccountsScreen = () => {
//   return (
//     <View>
//       <Text>AccountsScreen</Text>
//     </View>
//   )
// }

// export default AccountsScreen

import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const AccountsScreen = () => {
  const [recentAccounts, setRecentAccounts] = useState([
    {
      id: 1,
      name: "Patrick",
      time: "Just Now",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Chris",
      time: "2mins ago",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Seguni WOWOW",
      time: "15mins ago",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Olam Azurit",
      time: "1hour ago",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Patrick",
      time: "Just Now",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 6,
      name: "Chris",
      time: "2mins ago",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    {
      id: 7,
      name: "Seguni WOWOW",
      time: "15mins ago",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: 8,
      name: "Olam Azurit",
      time: "1hour ago",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
  ]);

  const handleRemove = (id:any) => {
    setRecentAccounts(recentAccounts.filter((account) => account.id !== id));
  };

  const handleClearAll = () => {
    setRecentAccounts([]);
  };

  return (
    <View className="bg-white flex-1">
      {/* Recent Header */}
      <View className="flex-row justify-between items-center px-5 py-4">
        <Text className="text-xl font-bold text-gray-900">Recent</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text className="text-gray-400 text-sm font-medium">Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Accounts List */}
      <ScrollView className="px-5">
        {recentAccounts.length > 0 ? (
          recentAccounts.map((account, index) => (
            <View
              key={account.id}
              className={`flex-row items-center justify-between py-3 ${
                index !== recentAccounts.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >
              <View className="flex-row items-center gap-3">
                {/* Avatar */}
                <Image
                  source={{ uri: account.avatar }}
                  className="w-12 h-12 rounded-full bg-gray-200"
                />

                {/* Name and Time */}
                <View>
                  <Text className="text-base font-semibold text-gray-900">
                    {account.name}
                  </Text>
                  <Text className="text-sm text-gray-500">{account.time}</Text>
                </View>
              </View>

              {/* Remove Button */}
              <TouchableOpacity
                onPress={() => handleRemove(account.id)}
                className="p-2"
              >
                <View className="w-5 h-5">
                  <View className="absolute w-full h-0.5 bg-gray-400 transform rotate-45 top-2.5" />
                  <View className="absolute w-full h-0.5 bg-gray-400 transform -rotate-45 top-2.5" />
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400 text-base">No recent accounts</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AccountsScreen;