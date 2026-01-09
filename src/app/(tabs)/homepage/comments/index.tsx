// import {
//   useGetProductComments,
//   useViewProduct,
// } from "@/src/api-services/productsApi/productQuery";
// import CommentSection from "@/src/components/homeScreen/CommentSection";
// import Screen from "@/src/layout/Screen";
// import { rS } from "@/src/lib/responsivehandler";
// import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useMemo } from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// const CommentsScreen = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();

//   const newData = useMemo(() => {
//     return params.item ? JSON.parse(params.item as string) : null;
//   }, [params.item]);

//   const viewUserProduct = useViewProduct(newData);
//   const getProductCommentLists = useGetProductComments(newData);

//   console.log("newData300", newData);
//   console.log(viewUserProduct, "viewUserProductBB");
//   console.log(getProductCommentLists, "getProductCommentLists400");

//   React.useEffect(() => {
//     if (newData) {
//       console.log("View Product Data:", viewUserProduct.data);
//       viewUserProduct.refetch();
//       getProductCommentLists.refetch();
//     }
//   }, [newData]);

//   return (
//     <Screen className="">
//       <View className="flex-row items-center justify-between p-4 bg-white">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="chevron-back" size={24} color="#2E6939" />
//         </TouchableOpacity>
//         <View>
//           <Text
//             className="font-[InterSemiBold] text-primary"
//             style={{ fontSize: rS(18) }}
//           >
//             Comments
//           </Text>
//         </View>
//         <View />
//       </View>

//       <View className="mx-4 mb-20">
//         <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
//           {/* Post Header */}
//           <View className="flex-row items-center p-4">
//             <View className="w-10 h-10 rounded-full mr-3">
//               <Image
//                 source={{
//                   uri: Array.isArray(viewUserProduct.data?.data?.images[0])
//                     ? viewUserProduct.data?.data?.images[0][0]
//                     : viewUserProduct.data?.data?.images[0],
//                 }}
//                 style={{
//                   height: "100%",
//                   width: "100%",
//                   borderRadius: 100,
//                 }}
//                 contentFit="cover"
//               />
//             </View>

//             <View className="flex-1">
//               <Text className="font-bold text-black">
//                 {viewUserProduct.data?.data.name}
//               </Text>
//             </View>
//           </View>

//           {/* Post Description */}
//           <View className="px-4 pb-3">
//             <Text className="text-gray-700 text-sm leading-5">
//               {viewUserProduct.data?.data?.description}
//             </Text>
//           </View>

//           {/* Post Image */}
//           <View className="w-full h-48">
//             <Image
//               source={{
//                 // uri: item.images[0],
//                 uri: Array.isArray(viewUserProduct.data?.data?.images[0])
//                   ? viewUserProduct.data?.data?.images[0][0]
//                   : viewUserProduct.data?.data?.images[0],
//               }}
//               style={{
//                 height: "100%",
//                 width: "100%",
//               }}
//               contentFit="cover"
//             />
//           </View>

//           {/* Action Bar */}
//           <View className="flex-row items-center justify-between p-4">
//             <View className="flex-row items-center space-x-4">
//               <TouchableOpacity
//                 className="mx-2  flex-row items-center justify-center"
//                 // onPress={() => handleLikeProduct(item.id)}
//               >
//                 {viewUserProduct.data?.data?.product_like === 0 ? (
//                   <FontAwesome name="heart-o" size={24} color="black" />
//                 ) : (
//                   <FontAwesome name="heart" size={24} color="red" />
//                 )}{" "}
//                 <Text className=" mx-2 text-lg">
//                   {viewUserProduct.data?.data?.product_like}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 className="mx-2  flex-row"
//                 // onPress={() => handleLikeProduct(item.id)}
//               >
//                 <Ionicons name="chatbubble-outline" size={20} color="#666" />
//               </TouchableOpacity>
//             </View>

//             <Text className="text-sm text-gray-500">
//               {viewUserProduct.data?.data?.distance_km} ... 54mins Away
//             </Text>

//             <TouchableOpacity className="bg-primary px-3 py-1 rounded-full flex-row items-center">
//               <Ionicons name="person-outline" size={14} color="white" />
//               <Text className="text-white text-xs font-medium ml-1">
//                 Direct Message
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Post Details */}
//           <View className="px-4 pb-4">
//             <Text className="text-primary text-sm font-medium mb-1">
//               Category :Beef Meat
//             </Text>
//             <View className="flex-row justify-end">
//               <Text className="text-lg font-bold text-black">
//                 ${viewUserProduct.data?.data?.amount}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* <View className=" bg-blue-500">
//         <CommentSection
//           getProductCommentLists={getProductCommentLists}
//           // getUserProduct={getUserProduct}
//         />

//       </View> */}
     

//       <View className="flex-1 bg-white rounded-lg overflow-hidden mb-4">
//         <CommentSection
//           getProductCommentLists={getProductCommentLists}
//           getUserProduct={viewUserProduct.data?.data} // Pass the actual product data
//         />
//       </View>
//     </Screen>
//   );
// };

// export default CommentsScreen;


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
import React, { useEffect, useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CommentsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const productId = useMemo(() => {
    return params.item ? JSON.parse(params.item as string) : null;
  }, [params.item]);

  const { data: viewUserProduct, refetch: refetchProduct } =
    useViewProduct(productId);
  const getProductCommentLists = useGetProductComments(productId);
  const product = viewUserProduct?.data;

  useEffect(() => {
    if (productId) {
      refetchProduct();
      getProductCommentLists.refetch();
    }
  }, [productId]);

  return (
    // Set scroll={false} so the CommentSection FlatList can handle scrolling
    <Screen className="bg-white" scroll={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#2E6939" />
          </TouchableOpacity>
          <Text
            className="font-bold text-gray-800"
            style={{ fontSize: rS(18) }}
          >
            Comments
          </Text>
          <View className="w-6" />
        </View>

        <CommentSection
          getProductCommentLists={getProductCommentLists}
          getUserProduct={product}
          // Header component for the FlatList so the product details scroll with comments
          ListHeaderComponent={
            product && (
              <View className="p-4">
                <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <View className="flex-row items-center p-3">
                    <Image
                      source={{
                        uri: Array.isArray(product.images[0])
                          ? product.images[0][0]
                          : product.images[0],
                      }}
                      className="w-10 h-10 rounded-full bg-gray-200"
                      contentFit="cover"
                    />
                    <Text className="ml-3 font-bold text-gray-900">
                      {product.name}
                    </Text>
                  </View>

                  <View className="px-3 pb-2">
                    <Text className="text-gray-600 text-sm">
                      {product.description}
                    </Text>
                  </View>

                  <Image
                    source={{
                      uri: Array.isArray(product.images[0])
                        ? product.images[0][0]
                        : product.images[0],
                    }}
                    // className="w-full h-48"
                    style={{
                      height: 192,
                      width: "100%",
                    }}
                    contentFit="cover"
                  />

                  <View className="flex-row items-center justify-between p-3">
                    <View className="flex-row items-center space-x-4">
                      <View className="flex-row items-center mr-4">
                        <FontAwesome
                          name={product.product_like > 0 ? "heart" : "heart-o"}
                          size={20}
                          color={product.product_like > 0 ? "red" : "black"}
                        />
                        <Text className="ml-2 font-medium">
                          {product.product_like}
                        </Text>
                      </View>
                      <Ionicons
                        name="chatbubble-outline"
                        size={20}
                        color="#666"
                      />
                    </View>
                    <Text className="text-xs text-gray-500 font-bold">
                      ${product.amount}
                    </Text>
                  </View>
                </View>
                <Text className="mt-4 font-bold text-gray-800 text-lg">
                  Recent Comments
                </Text>
              </View>
            )
          }
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default CommentsScreen;