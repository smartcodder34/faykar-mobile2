import {
    useFollowUserMutation,
    useUnFollowUserMutation,
} from "@/src/api-services/followApi/followerMutation";
import EmptyState from "@/src/components/EmptyState";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import { getInitials } from "@/src/utils/getInitials";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ViewUserProfile = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const followUserMutation = useFollowUserMutation();
  const unfollowUserMutation = useUnFollowUserMutation();

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  console.log("newData", newData);

  const handleFollower = (userId: string) => {
    console.log(userId);
    followUserMutation.mutate(userId);
  };
 

  return (
    <Screen className="">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[InterSemiBold] text-primary"
            style={{ fontSize: rS(18) }}
          >
            View Profile
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push("/profilepage/settings");
          }}
        >
          <Ionicons name="settings-outline" size={24} color="#2E6939" />
        </TouchableOpacity>
      </View>

      {/* Profile Info Section */}
      <View className="px-4 py-2 bg-white">
        <View className="flex-row items-center mb-4">
          <View
            className="rounded-full items-center justify-center bg-slate-200"
            style={{ width: rV(70), height: rV(70) }}
          >
            <Text className=" font-[PoppinsSemiBold] text-3xl">
              {getInitials(newData?.seller?.full_name)}
            </Text>
          </View>

          <View className="ml-4 flex-1">
            <Text
              className="text-primary font-[PoppinsBold]"
              style={{ fontSize: rS(16) }}
            >
              {newData?.seller?.full_name}
            </Text>
            <Text
              className="font-[PoppinsSemiBold] text-gray-600"
              style={{ fontSize: rS(12) }}
            >
              {newData?.seller.email}
            </Text>
          </View>
          <TouchableOpacity
            className=" h-10  bg-primary items-center justify-center rounded-full"
            onPress={() => {
              handleFollower(newData?.seller?.id);
            }}
          >
            <Text className="text-white px-4">Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Bio */}
        <View className="mb-4">
          <Text
            className="font-[PoppinsMedium] text-gray-700"
            style={{ fontSize: rS(12) }}
          >
            {
              "I'm a positive person. I love to travel and eat Always available for chat"
            }
          </Text>
        </View>

        {/* Edit Profile Button */}
        {/* <View className="mb-4">
          <CustomButton
            primary
            title="Edit Profile"
            onPress={() => {
              router.push("/profilepage/edit-profile");
            }}
          />
        </View> */}

        {/* Stats Section */}
        <View className="flex-row justify-around py-4 border-t border-gray-200">
          <View className="items-center">
            <Text
              className="font-[PoppinsBold] text-black"
              style={{ fontSize: rS(18) }}
            >
              0
            </Text>
            <Text
              className="font-[PoppinsMedium] text-gray-600"
              style={{ fontSize: rS(12) }}
            >
              Posts
            </Text>
          </View>

          <View className="items-center">
            <Text
              className="font-[PoppinsBold] text-black"
              style={{ fontSize: rS(18) }}
            >
              {newData?.seller.following_count}
            </Text>
            <Text
              className="font-[PoppinsMedium] text-gray-600"
              style={{ fontSize: rS(12) }}
            >
              Following
            </Text>
          </View>

          <View className="items-center">
            <Text
              className="font-[PoppinsBold] text-black"
              style={{ fontSize: rS(18) }}
            >
              {newData?.seller.follower_count}
            </Text>
            <Text
              className="font-[PoppinsMedium] text-gray-600"
              style={{ fontSize: rS(12) }}
            >
              Followers
            </Text>
          </View>
        </View>

        {/* Posts Label */}
        <View className="py-3">
          <Text
            className="font-[PoppinsBold] text-black"
            style={{ fontSize: rS(16) }}
          >
            Posts
          </Text>
        </View>
      </View>

      {/* Posts Grid */}
      <EmptyState />
      {/* <View className="flex-1 bg-white px-4">
        {userProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <PostsGrid userProducts={userProducts} />
        )}
      </View> */}
    </Screen>
  );
};

export default ViewUserProfile;
