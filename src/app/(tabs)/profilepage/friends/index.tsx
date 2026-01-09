// import { useGetUserApi } from '@/src/api-services/authApi/authQuery';
// import { useFetchFollowerApi } from '@/src/api-services/followApi/followQuery';
// import Screen from '@/src/layout/Screen';
// import { rS } from '@/src/lib/responsivehandler';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';

// const Friends = () => {
//      const router = useRouter();

//      const getUserData = useGetUserApi();
//      const fetchFollowers = useFetchFollowerApi();

//      const getUserFollowers = fetchFollowers?.data?.data?.followings ?? [];
//      const currentUserId = getUserData.data?.data?.id;

//      const handleRoute = (userId: string) => {

//         console.log("Clicked User ID:", userId);
//        if (currentUserId === userId) {
//         //  router.push("/profile");
//        } else {

//           router.push({
//             pathname: `/homepage/view-user-profile`,
//             params: { item: JSON.stringify(userId) },
//           });
//        }
//      };

//      const isLoading = fetchFollowers?.isLoading;
//      const hasNoFriends = !isLoading && getUserFollowers.length === 0;
//   return (
//     <Screen>
//       <View className="flex-row items-center justify-between p-4 bg-white">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="chevron-back" size={24} color="#2E6939" />
//         </TouchableOpacity>
//         <View>
//           <Text
//             className="font-[InterSemiBold] text-primary"
//             style={{ fontSize: rS(18) }}
//           >
//             My Friends
//           </Text>
//         </View>
//         <View />
//       </View>
//     </Screen>
//   );
// }

// export default Friends

import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
import { useFetchFollowerApi } from "@/src/api-services/followApi/followQuery";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { getInitials } from "@/src/utils/getInitials";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const Friends = () => {
  const router = useRouter();

  const getUserData = useGetUserApi();
  const fetchFollowers = useFetchFollowerApi();

  const getUserFollowers = fetchFollowers?.data?.data?.followings ?? [];
  const currentUserId = getUserData.data?.data?.id;

  const handleRoute = (userId: string, item:any) => {
    if (currentUserId === userId) {
      // router.push("/profile"); // Uncomment if profile route is ready
      return;
    } else {
      router.push({
        pathname: `/homepage/view-user-profile`,
        params: { item: JSON.stringify(item) },
      });
    }
  };

  const isLoading = fetchFollowers?.isLoading;

  const renderFriendItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleRoute(item.id, item)}
      className="flex-row items-center px-4 py-3 bg-white border-b border-gray-50"
    >
      {/* Avatar Container */}
      <View className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 items-center justify-center">
        {item?.profile_img ? (
          <Image
            source={{ uri: item.profile_img }}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        ) : (
          <View className="h-full w-full bg-primary items-center justify-center">
            <Text className="text-white font-bold text-sm">
              {getInitials(item.full_name)}
            </Text>
          </View>
        )}
      </View>

      {/* Name and Status */}
      <View className="flex-1 ml-3">
        <Text className="text-[15px] font-[InterSemiBold] text-gray-900 truncate">
          {item.full_name}
        </Text>
        <Text className="text-xs text-gray-500 mt-0.5">
          {item.last_seen ?? "Offline"}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <Screen className="bg-white" scroll={false}>
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[InterSemiBold] text-primary"
            style={{ fontSize: rS(18) }}
          >
            My Friends
          </Text>
        </View>
        <View className="w-8" />
      </View>

      {/* Friends List */}
      <FlatList
        data={getUserFollowers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFriendItem}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading && getUserFollowers.length > 0}
            onRefresh={() => fetchFollowers.refetch()}
          />
        }
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-20 px-10">
            {isLoading ? (
              <ActivityIndicator color="#2E6939" size="large" />
            ) : (
              <>
                <View className="bg-gray-100 p-6 rounded-full mb-4">
                  <Ionicons name="people-outline" size={40} color="#9CA3AF" />
                </View>
                <Text className="text-gray-500 text-center font-[InterMedium]">
                  {`You don’t have any friends yet.`}
                </Text>
              </>
            )}
          </View>
        )}
      />
    </Screen>
  );
};

export default Friends;
