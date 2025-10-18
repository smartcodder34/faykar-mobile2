import {
    useGetProductComments,
    useViewProduct,
} from "@/src/api-services/productsApi/productQuery";
import CommentSection from "@/src/components/homeScreen/CommentSection";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CommentsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const newData = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  const viewUserProduct = useViewProduct(newData);
  const getProductCommentLists = useGetProductComments(newData);

  console.log("newData300", newData);
  console.log(viewUserProduct, "viewUserProductBB");
  console.log(getProductCommentLists, "getProductCommentLists400");

  React.useEffect(() => {
    if (newData) {
      console.log("View Product Data:", viewUserProduct.data);
      viewUserProduct.refetch();
      getProductCommentLists.refetch();
    }
  }, [newData]);

  return (
    <Screen className="">
      <View className="flex-row items-center justify-between p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[InterSemiBold] text-primary"
            style={{ fontSize: rS(18) }}
          >
            Comments
          </Text>
        </View>
        <View />
      </View>

      <View className="mx-4 mb-20">
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          {/* Post Header */}
          <View className="flex-row items-center p-4">
            <View className="w-10 h-10 rounded-full mr-3">
              <Image
                source={{
                  uri: Array.isArray(viewUserProduct.data?.data?.images[0])
                    ? viewUserProduct.data?.data?.images[0][0]
                    : viewUserProduct.data?.data?.images[0],
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
                {viewUserProduct.data?.data.name}
              </Text>
            </View>
          </View>

          {/* Post Description */}
          <View className="px-4 pb-3">
            <Text className="text-gray-700 text-sm leading-5">
              {viewUserProduct.data?.data?.description}
            </Text>
          </View>

          {/* Post Image */}
          <View className="w-full h-48">
            <Image
              source={{
                // uri: item.images[0],
                uri: Array.isArray(viewUserProduct.data?.data?.images[0])
                  ? viewUserProduct.data?.data?.images[0][0]
                  : viewUserProduct.data?.data?.images[0],
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
              <TouchableOpacity
                className="mx-2  flex-row items-center justify-center"
                // onPress={() => handleLikeProduct(item.id)}
              >
                {viewUserProduct.data?.data?.product_like === 0 ? (
                  <FontAwesome name="heart-o" size={24} color="black" />
                ) : (
                  <FontAwesome name="heart" size={24} color="red" />
                )}{" "}
                <Text className=" mx-2 text-lg">
                  {viewUserProduct.data?.data?.product_like}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mx-2  flex-row"
                // onPress={() => handleLikeProduct(item.id)}
              >
                <Ionicons name="chatbubble-outline" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <Text className="text-sm text-gray-500">
              {viewUserProduct.data?.data?.distance_km} ... 54mins Away
            </Text>

            <TouchableOpacity className="bg-primary px-3 py-1 rounded-full flex-row items-center">
              <Ionicons name="person-outline" size={14} color="white" />
              <Text className="text-white text-xs font-medium ml-1">
                Direct Message
              </Text>
            </TouchableOpacity>
          </View>

          {/* Post Details */}
          <View className="px-4 pb-4">
            <Text className="text-primary text-sm font-medium mb-1">
              Category :Beef Meat
            </Text>
            <View className="flex-row justify-end">
              <Text className="text-lg font-bold text-black">
                ${viewUserProduct.data?.data?.amount}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* <View className=" bg-blue-500">
        <CommentSection
          getProductCommentLists={getProductCommentLists}
          // getUserProduct={getUserProduct}
        />
      </View> */}

      <View className="flex-1 bg-white rounded-lg overflow-hidden mb-4">
        <CommentSection
          getProductCommentLists={getProductCommentLists}
          getUserProduct={viewUserProduct.data?.data} // Pass the actual product data
        />
      </View>
    </Screen>
  );
};

export default CommentsScreen;
