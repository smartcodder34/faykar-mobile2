// import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
// import { useLikeProductMutation } from "@/src/api-services/productsApi/productMutation";
// import { useGetProducts } from "@/src/api-services/productsApi/productQuery";
// import { useRecordLocationApi } from "@/src/api-services/recordlocation/recordLocationMutation";
// import { useGetUserStatusStories } from "@/src/api-services/statusStoryApi/statusQuery";
// import HomeHeader from "@/src/components/homeScreen/HomeHeader";
// import StatusModal from "@/src/components/homeScreen/StatusModal";
// import { useLocation } from "@/src/hooks/useLocation";
// import Screen from "@/src/layout/Screen";
// import useGetLocation from "@/src/store/locationStore";
// import { getInitials } from "@/src/utils/getInitials";
// import { FontAwesome, Ionicons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React from "react";
// import {
//   Dimensions,
//   // Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const { width } = Dimensions.get("window");

// const Homepage = () => {
//   const router = useRouter();
//   const [selectedGroup, setSelectedGroup] = React.useState<any>(null);
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const { location, address } = useLocation();
//   const getAllProducts = useGetProducts();
//   const getUserData = useGetUserApi();
//   const { data: statusResponse, isLoading } = useGetUserStatusStories();
//   console.log("statusResponsehomepage:", statusResponse);

//   const handleOpenStatus = (group: any) => {
//     setSelectedGroup(group);
//     setIsModalVisible(true);
//   };

//   // Transform API data into grouped stories (all stories per user, sorted newest first)
//   const userStoryGroups = React.useMemo(() => {
//     if (!statusResponse?.data) return [];

//     return Object.entries(statusResponse.data)
//       .map(([userId, stories]) => {
//         // Clean up URLs by trimming whitespace
//         const cleanedStories = stories.map((story) => ({
//           ...story,
//           media_path: story.media_path.trim(), // 👈 TRIM WHITESPACE HERE
//         }));

//         const sortedStories = [...cleanedStories].sort(
//           (a, b) =>
//             new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//         );

//         const firstStory = sortedStories[0];

//         return {
//           userId,
//           name: firstStory.user.full_name,
//           profileImg: firstStory.user.profile_img,
//           stories: sortedStories.map((s) => ({
//             id: s.id,
//             media_path: s.media_path,
//             created_at: s.created_at,
//           })),
//         };
//       })
//       .filter((group) => group.stories.length > 0);
//   }, [statusResponse]);

//   console.log("userStoryGroupshomepage:", userStoryGroups);

//   const likeProduct = useLikeProductMutation();
//   const recordUserLocation = useRecordLocationApi();
//   const handleRecordLocation = async () => {
//     if (location) {
//       await recordUserLocation.mutateAsync({
//         latitude: location?.coords?.latitude,
//         longitude: location?.coords?.longitude,
//       });
//     }
//   };

//   React.useEffect(() => {
//     handleRecordLocation();
//   }, [location]);

//   const setUserLocation = useGetLocation().setUserLocation;

//   const allProducts = getAllProducts?.data?.data?.products || [];

//   const currentUserId = getUserData.data?.data?.id;

//   React.useEffect(() => {
//     if (location)
//       setUserLocation({
//         user_latitude: location?.coords?.latitude,
//         user_longitude: location?.coords?.longitude,
//         user_address: `${address?.[0].name}, ${address?.[0]?.city}, ${address?.[0]?.region}, ${address?.[0]?.country}`,
//       });
//   }, [location, address, setUserLocation]);

//   const handleLikeProduct = (productId: string) => {
//     likeProduct.mutate(productId);
//   };

//   const handleViewProduct = (productId: string) => {
//     router.push({
//       pathname: `/(tabs)/homepage/comments`,
//       params: { item: JSON.stringify(productId) },
//     });
//   };

//   const handleOpenChatRoom = (message: any) => {
//     router.push({
//       pathname: `/(tabs)/homepage/direct-message/chat-room`,
//       params: { item: JSON.stringify(message) },
//     });
//   };

//   const handleDirectMesaage = (productDetails: string) => {
//     router.push({
//       pathname: `/(tabs)/homepage/direct-message`,
//       params: { item: JSON.stringify(productDetails) },
//     });
//   };

//   const handleViewUserProfile = (item: any) => {
//     router.push({
//       pathname: `/homepage/view-user-profile`,
//       params: { item: JSON.stringify(item) },
//     });
//   };
//   return (
//     <Screen className="bg-white" scroll={true}>
//       {/* Top Navigation Bar */}
//      <HomeHeader />
//       {/* Promotional Banner */}
//       {/* <View className="mx-4 mb-4">
//         <View className="relative h-40 rounded-2xl overflow-hidden">
//           <Image
//             source={{
//               uri: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop",
//             }}
//             style={{
//               height: "100%",
//               width: "100%",
//             }}
//             contentFit="cover"
//           />
//           <LinearGradient
//             colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.2)"]}
//             className="absolute inset-0"
//           />
//           <View className="absolute bottom-4 left-4">
//             <Text className="text-white text-lg font-bold mb-2">
//               50% off for clothing & shoes
//             </Text>
//             <TouchableOpacity className="bg-primary px-4 py-2 rounded-full self-start">
//               <Text className="text-white font-semibold text-sm">Shop Now</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

       
//         <View className="flex-row justify-center mt-2 space-x-2">
//           <View className="w-2 h-2 bg-primary rounded-full" />
//           <View className="w-2 h-2 bg-gray-300 rounded-full" />
//           <View className="w-2 h-2 bg-gray-300 rounded-full" />
//         </View>
//       </View> */}

//       {/* Share your Product Section */}
//       <View className="mx-4 mb-4 flex-row items-center">
//         <View className="w-10 h-10 rounded-full mr-3">
//           {getUserData?.data?.data?.profile_img ? (
//             <Image
//               source={{ uri: getUserData?.data?.data?.profile_img }}
//               style={{
//                 height: "100%",
//                 width: "100%",
//                 borderRadius: 100,
//               }}
//               contentFit="cover"
//             />
//           ) : (
//             <View className="bg-gray-400 w-10 h-10 rounded-full items-center justify-center">
//               <Text className=" text-white">
//                 {getInitials(getUserData?.data?.data?.full_name)}
//               </Text>
//             </View>
//           )}
//         </View>

//         <TouchableOpacity
//           className="flex-1 bg-primary rounded-full px-4 py-3"
//           onPress={() => router.push("/homepage/create-product")}
//         >
//           <Text className="text-white text-center font-medium">
//             Share your Product
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity className="ml-3 w-10 h-10 bg-gray-100 rounded-lg items-center justify-center">
//           <Ionicons name="images-outline" size={20} color="#666" />
//         </TouchableOpacity>
//       </View>

//       {/* Horizontal Scrollable Product Cards */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         className="mb-4"
//         contentContainerStyle={{ paddingHorizontal: 16 }}
//       >
//         {/* Add Product Card */}
//         <TouchableOpacity
//           className="w-16 mr-3 items-center"
//           onPress={() => {
//             router.push("/homepage/create-status");
//           }}
//         >
//           <View className="w-14 h-20 bg-white border-2 border-dashed border-gray-300 rounded-xl items-center justify-center mb-2">
//             <Ionicons name="add" size={20} color="#666" />
//           </View>
//           {/* <Text className="text-xs text-gray-600 font-medium">Abdul</Text> */}
//         </TouchableOpacity>

//         {/* {userStoryGroups?.map((item, index) => (
//           <TouchableOpacity key={index} className="w-16 mr-3 items-center">
//             <View className="w-14 h-20 rounded-xl overflow-hidden mb-2 relative">
//               <Image
//                 source={{ uri: item.stories[0].media_path }}
//                 style={{
//                   height: "100%",
//                   width: "100%",
//                 }}
//                 contentFit="cover"
//               />
//               <View
//                 className="w-5 h-5 border-2 border-white rounded-full absolute bottom-1 left-1/2"
//                 style={{ transform: [{ translateX: -10 }] }}
//               >
//                 <Image
//                   source={{ uri: item.profileImg }}
//                   style={{
//                     height: "100%",
//                     width: "100%",
//                     borderRadius: 100,
//                   }}
//                   contentFit="cover"
//                 />
//               </View>
//             </View>
//             <Text className="text-xs text-center text-gray-600 font-medium">
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         ))} */}

//         {/* Status List */}
//         {userStoryGroups?.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             className="w-16 mr-3 items-center"
//             onPress={() => handleOpenStatus(item)} // 3. Add this trigger
//           >
//             <View className="w-14 h-20 rounded-xl overflow-hidden mb-2 relative border-2 border-primary">
//               <Image
//                 source={{ uri: item.stories[0].media_path }}
//                 style={{ height: "100%", width: "100%" }}
//                 contentFit="cover"
//               />
//               <View
//                 className="w-5 h-5 border-2 border-white rounded-full absolute bottom-1 left-1/2"
//                 style={{ transform: [{ translateX: -10 }] }}
//               >
//                 <Image
//                   source={{ uri: item.profileImg }}
//                   style={{ height: "100%", width: "100%", borderRadius: 100 }}
//                   contentFit="cover"
//                 />
//               </View>
//             </View>
//             <Text
//               className="text-xs text-center text-gray-600 font-medium"
//               numberOfLines={1}
//             >
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Main Feed Posts */}
//       <View className="mx-4 mb-20">
//         {allProducts.map((item: any, index: number) => {
//           return (
//             <View
//               key={index}
//               className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4"
//             >
//               {/* Post Header */}
//               <TouchableOpacity
//                 className="flex-row items-center p-4"
//                 onPress={() => {
//                   handleViewUserProfile(item);
//                 }}
//               >
//                 <View className=" items-center justify-center w-10 h-10 rounded-full bg-slate-200 mr-2">
//                   <Text>{getInitials(item.seller?.full_name)}</Text>
//                 </View>

//                 <View className="flex-1">
//                   <Text className="font-bold text-black">
//                     {item.seller?.full_name}
//                   </Text>
//                   <Text className="text-sm text-primary font-[PoppinsSemiBold]">
//                     {item.name}
//                   </Text>
//                 </View>
//               </TouchableOpacity>

//               {/* Post Description */}
//               <View className="px-4 pb-3">
//                 <Text className="text-gray-700 text-sm leading-5">
//                   {item.description}
//                 </Text>
//               </View>

//               {/* Post Image */}
//               <View className="w-full h-48">
//                 <Image
//                   source={{
//                     // uri: item.images[0],
//                     uri: Array.isArray(item.images[0])
//                       ? item.images[0][0]
//                       : item.images[0],
//                   }}
//                   style={{
//                     height: "100%",
//                     width: "100%",
//                   }}
//                   contentFit="cover"
//                 />
//               </View>

//               {/* Action Bar */}
//               <View className="flex-row items-center justify-between p-4">
//                 <View className="flex-row items-center space-x-4">
//                   <TouchableOpacity
//                     className="mx-1  flex-row items-center justify-center"
//                     onPress={() => handleLikeProduct(item.id)}
//                   >
//                     {item.product_like === 0 ? (
//                       <FontAwesome name="heart-o" size={24} color="black" />
//                     ) : (
//                       <FontAwesome name="heart" size={24} color="red" />
//                     )}{" "}
//                     <Text className=" mx-1 text-lg">{item?.product_like}</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     className="mx-2  flex-row"
//                     onPress={() => handleViewProduct(item.id)}
//                   >
//                     <Ionicons
//                       name="chatbubble-outline"
//                       size={20}
//                       color="#666"
//                     />{" "}
//                     <Text className="mx-2">{item?.comments_count}</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <Text className="text-sm text-gray-500">
//                   {item?.distance_km}..
//                   {/* <Text className="text-sm text-gray-500">54mins</Text> */}
//                 </Text>

//                 {item.seller?.id === currentUserId ? null : (
//                   <TouchableOpacity
//                     className={`bg-primary px-3 py-1 rounded-full flex-row items-center `}
//                     // onPress={() => router.push("/homepage/direct-message")}
//                     onPress={() => handleOpenChatRoom(item)}
//                   >
//                     <Ionicons name="person-outline" size={14} color="white" />
//                     <Text className="text-white text-xs font-medium ml-1">
//                       Direct Message
//                     </Text>
//                   </TouchableOpacity>
//                 )}
//               </View>

//               {/* Post Details */}
//               <View className="px-4 pb-4">
//                 <Text className="text-primary text-sm font-medium mb-1">
//                   Category :Beef Meat
//                 </Text>
//                 <View className="flex-row justify-end">
//                   <Text className="text-lg font-bold text-black">
//                     ${item.amount}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           );
//         })}
//       </View>

//       <StatusModal
//         visible={isModalVisible}
//         storyGroup={selectedGroup}
//         onClose={() => setIsModalVisible(false)}
//       />
//     </Screen>
//   );
// };

// export default Homepage;



import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
import { useLikeProductMutation } from "@/src/api-services/productsApi/productMutation";
import { useGetProducts } from "@/src/api-services/productsApi/productQuery";
import { useRecordLocationApi } from "@/src/api-services/recordlocation/recordLocationMutation";
import { useGetUserStatusStories } from "@/src/api-services/statusStoryApi/statusQuery";
import HomeHeader from "@/src/components/homeScreen/HomeHeader";
import StatusModal from "@/src/components/homeScreen/StatusModal";
import { useLocation } from "@/src/hooks/useLocation";
import Screen from "@/src/layout/Screen";
import useGetLocation from "@/src/store/locationStore";
import { getInitials } from "@/src/utils/getInitials";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const Homepage = () => {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = React.useState<any>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { location, address } = useLocation();
  const getAllProducts = useGetProducts();
  const getUserData = useGetUserApi();
  const { data: statusResponse, isLoading } = useGetUserStatusStories();

  const handleOpenStatus = (group: any) => {
    setSelectedGroup(group);
    setIsModalVisible(true);
  };

  // Transform API data into grouped stories
  const userStoryGroups = React.useMemo(() => {
    if (!statusResponse?.data) return [];

    return Object.entries(statusResponse.data)
      .map(([userId, stories]) => {
        const cleanedStories = stories.map((story) => ({
          ...story,
          media_path: story.media_path.trim(),
        }));

        const sortedStories = [...cleanedStories].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        const firstStory = sortedStories[0];

        return {
          userId,
          name: firstStory.user.full_name,
          profileImg: firstStory.user.profile_img,
          stories: sortedStories.map((s) => ({
            id: s.id,
            media_path: s.media_path,
            created_at: s.created_at,
          })),
        };
      })
      .filter((group) => group.stories.length > 0);
  }, [statusResponse]);

  const likeProduct = useLikeProductMutation();
  const recordUserLocation = useRecordLocationApi();

  const handleRecordLocation = async () => {
    if (location) {
      await recordUserLocation.mutateAsync({
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      });
    }
  };

  React.useEffect(() => {
    handleRecordLocation();
  }, [location]);

  const setUserLocation = useGetLocation().setUserLocation;

  const allProducts = getAllProducts?.data?.data?.products || [];
  const currentUserId = getUserData.data?.data?.id;

  React.useEffect(() => {
    if (location && address && address.length > 0) {
      setUserLocation({
        user_latitude: location?.coords?.latitude,
        user_longitude: location?.coords?.longitude,
        user_address: `${address[0]?.name || ""}, ${address[0]?.city || ""}, ${
          address[0]?.region || ""
        }, ${address[0]?.country || ""}`,
      });
    }
  }, [location, address, setUserLocation]);

  const handleLikeProduct = (productId: string) => {
    likeProduct.mutate(productId);
  };

  const handleViewProduct = (productId: string) => {
    router.push({
      pathname: `/(tabs)/homepage/comments`,
      params: { item: JSON.stringify(productId) },
    });
  };

  const handleOpenChatRoom = (message: any) => {
    router.push({
      pathname: `/(tabs)/homepage/direct-message/chat-room`,
      params: { item: JSON.stringify(message) },
    });
  };

  const handleViewUserProfile = (item: any) => {
    router.push({
      pathname: `/homepage/view-user-profile`,
      params: { item: JSON.stringify(item) },
    });
  };

  return (
    <Screen className="bg-white" scroll={true}>
      <HomeHeader />

      {/* Share your Product Section */}
      <View className="mx-4 mb-4 flex-row items-center">
        <View className="w-10 h-10 rounded-full mr-3">
          {getUserData?.data?.data?.profile_img ? (
            <Image
              source={{ uri: getUserData?.data?.data?.profile_img }}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 100,
              }}
              contentFit="cover"
            />
          ) : (
            <View className="bg-gray-400 w-10 h-10 rounded-full items-center justify-center">
              <Text className="text-white">
                {getInitials(getUserData?.data?.data?.full_name)}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          className="flex-1 bg-primary rounded-full px-4 py-3"
          onPress={() => router.push("/homepage/create-product")}
        >
          <Text className="text-white text-center font-medium">
            Share your Product
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="ml-3 w-10 h-10 bg-gray-100 rounded-lg items-center justify-center">
          <Ionicons name="images-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Product Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {/* Add Product Card */}
        <TouchableOpacity
          className="w-16 mr-3 items-center"
          onPress={() => {
            router.push("/homepage/create-status");
          }}
        >
          <View className="w-14 h-20 bg-white border-2 border-dashed border-gray-300 rounded-xl items-center justify-center mb-2">
            <Ionicons name="add" size={20} color="#666" />
          </View>
        </TouchableOpacity>

        {/* Status List */}
        {userStoryGroups?.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="w-16 mr-3 items-center"
            onPress={() => handleOpenStatus(item)}
          >
            <View className="w-14 h-20 rounded-xl overflow-hidden mb-2 relative border-2 border-primary">
              <Image
                source={{ uri: item.stories[0].media_path }}
                style={{ height: "100%", width: "100%" }}
                contentFit="cover"
              />
              <View
                className="w-5 h-5 border-2 border-white rounded-full absolute bottom-1 left-1/2"
                style={{ transform: [{ translateX: -10 }] }}
              >
                <Image
                  source={{ uri: item.profileImg }}
                  style={{ height: "100%", width: "100%", borderRadius: 100 }}
                  contentFit="cover"
                />
              </View>
            </View>
            <Text
              className="text-xs text-center text-gray-600 font-medium"
              numberOfLines={1}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Main Feed Posts */}
      <View className="mx-4 mb-20">
        {allProducts.map((item: any, index: number) => {
          return (
            <View
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4"
            >
              {/* Post Header */}
              <TouchableOpacity
                className="flex-row items-center p-4"
                onPress={() => {
                  handleViewUserProfile(item);
                }}
              >
                <View className="items-center justify-center w-10 h-10 rounded-full bg-slate-200 mr-2">
                  <Text>{getInitials(item.seller?.full_name)}</Text>
                </View>

                <View className="flex-1">
                  <Text className="font-bold text-black">
                    {item.seller?.full_name || "Unknown"}
                  </Text>
                  <Text className="text-sm text-primary font-[PoppinsSemiBold]">
                    {item.name || ""}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Post Description */}
              <View className="px-4 pb-3">
                <Text className="text-gray-700 text-sm leading-5">
                  {item.description || ""}
                </Text>
              </View>

              {/* Post Image */}
              <View className="w-full h-48">
                <Image
                  source={{
                    uri: Array.isArray(item.images[0])
                      ? item.images[0][0]
                      : item.images[0],
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
                    className="mx-1 flex-row items-center justify-center"
                    onPress={() => handleLikeProduct(item.id)}
                  >
                    {item.product_like === 0 ? (
                      <FontAwesome name="heart-o" size={24} color="black" />
                    ) : (
                      <FontAwesome name="heart" size={24} color="red" />
                    )}
                    <Text className="mx-1 text-lg">
                      {item?.product_like || 0}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="mx-2 flex-row"
                    onPress={() => handleViewProduct(item.id)}
                  >
                    <Ionicons
                      name="chatbubble-outline"
                      size={20}
                      color="#666"
                    />
                    <Text className="mx-2">{item?.comments_count || 0}</Text>
                  </TouchableOpacity>
                </View>

                <Text className="text-sm text-gray-500">
                  {item?.distance_km || "0km"}
                </Text>

                {item.seller?.id === currentUserId ? null : (
                  <TouchableOpacity
                    className="bg-primary px-3 py-1 rounded-full flex-row items-center"
                    onPress={() => handleOpenChatRoom(item)}
                  >
                    <Ionicons name="person-outline" size={14} color="white" />
                    <Text className="text-white text-xs font-medium ml-1">
                      Direct Message
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Post Details */}
              <View className="px-4 pb-4">
                <Text className="text-primary text-sm font-medium mb-1">
                  Category: {item.category?.name || "Beef Meat"}
                </Text>
                <View className="flex-row justify-end">
                  <Text className="text-lg font-bold text-black">
                    ${item.amount || "0.00"}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <StatusModal
        visible={isModalVisible}
        storyGroup={selectedGroup}
        onClose={() => setIsModalVisible(false)}
      />
    </Screen>
  );
};

export default Homepage;