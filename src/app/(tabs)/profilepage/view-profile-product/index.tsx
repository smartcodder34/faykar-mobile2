import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
import {
  useGetProductComments,
  useViewProduct,
} from "@/src/api-services/productsApi/productQuery";
import CommentSection from "@/src/components/homeScreen/CommentSection";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import { getInitials } from "@/src/utils/getInitials";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ViewProfileProduct = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const getUserData = useGetUserApi();

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  const viewUserProduct = useViewProduct(newData);
  const getProductCommentLists = useGetProductComments(newData);
  const product = viewUserProduct?.data?.data;

  console.log(viewUserProduct, "viewUserProductBB");
  console.log(newData, "newData");

  React.useEffect(() => {
    if (newData) {
      console.log("View Product Data:", viewUserProduct.data);
      viewUserProduct.refetch();
      getProductCommentLists.refetch();
    }
  }, [newData]);

  const productHeader = (
    <View className="p-4">
      <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Post Header */}
        <View className="flex-row items-center p-4">
          <View className="w-10 h-10 rounded-full mr-3">
            <Image
              source={{
                uri: Array.isArray(product?.images?.[0])
                  ? product?.images?.[0]?.[0]
                  : product?.images?.[0],
              }}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 100,
              }}
              contentFit="cover"
            />
          </View>

          <View className="flex-1">
            <Text className="font-bold text-black">
              {product?.name}
            </Text>
          </View>
        </View>

        {/* Post Description */}
        <View className="px-4 pb-3">
          <Text className="text-gray-700 text-sm leading-5">
            {product?.description}
          </Text>
        </View>

        {/* Post Image */}
        <View style={{ height: 192, width: "100%" }}>
          <Image
            source={{
              uri: Array.isArray(product?.images?.[0])
                ? product?.images?.[0]?.[0]
                : product?.images?.[0],
            }}
            style={{
              height: "100%",
              width: "100%",
            }}
            contentFit="cover"
          />
        </View>

        {/* Action Bar */}
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity className="flex-row items-center justify-center">
              {product?.product_like === 0 ? (
                <FontAwesome name="heart-o" size={24} color="black" />
              ) : (
                <FontAwesome name="heart" size={24} color="red" />
              )}
              <Text className="mx-2 text-lg">
                {product?.product_like}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row">
              <Ionicons name="chatbubble-outline" size={20} color="#666" />
            </TouchableOpacity>
            <Text className="text-lg">
              {product?.comments_count}
            </Text>
          </View>

          <Text className="text-sm text-gray-500">
            {product?.distance_km}
          </Text>
        </View>

        {/* Post Details */}
        <View className="px-4 pb-4">
          <View className="flex-row justify-end">
            <Text className="text-lg font-bold text-black">
              ${product?.amount}
            </Text>
          </View>
        </View>
      </View>
      <Text className="mt-4 font-bold text-gray-800 text-lg">
        Comments
      </Text>
    </View>
  );

  return (
    <Screen className="" scroll={false} keyboardAware={false}>
      <View className="flex-row items-center justify-between p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[InterSemiBold] text-primary"
            style={{ fontSize: rS(18) }}
          >
            View Product
          </Text>
        </View>
        <View />
      </View>
      <View className="px-4 py-2 bg-white">
        <View className="flex-row items-center mb-4">
          <View
            className="rounded-full items-center justify-center bg-slate-200"
            style={{ width: rV(70), height: rV(70) }}
          >
            {getUserData?.data?.data?.profile_img ? (
              <Image
                source={{ uri: getUserData?.data?.data?.profile_img }}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 100,
                }}
                contentFit="cover"
                onError={(error) => console.log("Image error:", error)}
              />
            ) : (
              <View
                className="bg-gray-400 rounded-full items-center justify-center"
                style={{ width: rV(70), height: rV(70) }}
              >
                <Text className=" text-white">
                  {getInitials(getUserData?.data?.data?.full_name)}
                </Text>
              </View>
            )}
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
      </View>

      <CommentSection
        getProductCommentLists={getProductCommentLists}
        getUserProduct={product}
        ListHeaderComponent={product ? productHeader : null}
      />
    </Screen>
  );
};

export default ViewProfileProduct;
