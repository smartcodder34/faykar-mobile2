import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
import { useGetUserProducts } from "@/src/api-services/productsApi/productQuery";
import EmptyState from "@/src/components/EmptyState";
import PostsGrid from "@/src/components/profileScreen/PostsGrid";
import CustomButton from "@/src/CustomComps/CustomButton";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import { getInitials } from "@/src/utils/getInitials";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProfilePage = () => {
  const router = useRouter();
  const getUserData = useGetUserApi();
  const getUserProducts = useGetUserProducts();
  const userProducts = getUserProducts?.data?.data?.products || [];

  console.log("userProducts2000:", userProducts);

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
            My Profile
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
            {/* <Image
              source={require("@/assets/images/profile-img.jpg")}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 100,
              }}
              contentFit="cover"
              onError={(error) => console.log("Image error:", error)}
            /> */}
            <Text className=" font-[PoppinsSemiBold] text-3xl">
              {getInitials(getUserData?.data?.data?.full_name)}
            </Text>
          </View>

          <View className="ml-4 flex-1">
            <Text
              className="text-primary font-[PoppinsBold]"
              style={{ fontSize: rS(16) }}
            >
              {getUserData?.data?.data?.full_name}
            </Text>
            <Text
              className="font-[PoppinsSemiBold] text-gray-600"
              style={{ fontSize: rS(12) }}
            >
              {getUserData?.data?.data?.email}
            </Text>
          </View>
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
        <View className="mb-4">
          <CustomButton
            primary
            title="Edit Profile"
            onPress={() => {
              router.push("/profilepage/edit-profile");
            }}
          />
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-around py-4 border-t border-gray-200">
          <View className="items-center">
            <Text
              className="font-[PoppinsBold] text-black"
              style={{ fontSize: rS(18) }}
            >
              87
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
              870
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
              15k
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
      <View className="flex-1 bg-white px-4">
        {userProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <PostsGrid userProducts={userProducts} />
        )}
      </View>
    </Screen>
  );
};

export default ProfilePage;
