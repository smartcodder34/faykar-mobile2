// import CustomButton from "@/src/CustomComps/CustomButton";
// import Screen from "@/src/layout/Screen";
// import { Ionicons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// const ProfilePage = () => {
//   const router = useRouter();

//   return (
//     <Screen className="p-8">
//       <View className=" flex-row items-center justify-between ">
//         <TouchableOpacity onPress={() => {}}>
//           <Ionicons name="chevron-back" size={24} color="#2E6939" />
//         </TouchableOpacity>
//         <View>
//           <Text className="font-[InterSemiBold] text-2xl text-primary">
//             Profile
//           </Text>
//         </View>

//         <View />
//       </View>

//       <View className=" pt-8 flex-row items-center justify-between my-5">
//         <View className=" flex-row items-center">
//           <View className=" rounded-full" style={{ width: 71, height: 71 }}>
//             <Image
//               source={require("@/assets/images/profile-img.jpg")}
//               style={{
//                 height: "100%",
//                 width: "100%",
//                 // alignSelf: "center",
//                 borderRadius: 100,
//               }}
//               contentFit="cover"
//               onError={(error) => console.log("Image error:", error)}
//             />
//           </View>

//           <View className=" mx-5">
//             <Text className=" text-xl text-primary font-[PoppinsBold]">
//               Namaha Chandra
//             </Text>
//             <Text className=" text-sm font-[PoppinsSemiBold]">
//               Arsenal, London
//             </Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           onPress={() => {
//             router.push("/profilepage/settings");
//           }}
//         >
//           <Ionicons name="settings-outline" size={24} color="#2E6939" />
//         </TouchableOpacity>
//       </View>
//       <View className=" mb-5">
//         <Text className=" text-sm font-[PoppinsMedium]">
//           I’m a postive person. I love to travel and eat Always available for
//           chat
//         </Text>
//       </View>

//       <View className="">
//         <CustomButton primary title="Edit Profile" />
//       </View>
//     </Screen>
//   );
// };

// export default ProfilePage;


import CustomButton from "@/src/CustomComps/CustomButton";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const ProfilePage = () => {
  const router = useRouter();

  // Mock data for the image grid
  const posts = [
    { id: "1", image: require("@/assets/images/post1.png") },
    { id: "2", image: require("@/assets/images/post2.png") },
    { id: "3", image: require("@/assets/images/post1.png") },
    { id: "4", image: require("@/assets/images/post2.png") },
    { id: "5", image: require("@/assets/images/post1.png") },
    { id: "6", image: require("@/assets/images/post2.png") },
    { id: "7", image: require("@/assets/images/post1.png") },
    { id: "8", image: require("@/assets/images/post2.png") },
    { id: "9", image: require("@/assets/images/post1.png") },
    { id: "10", image: require("@/assets/images/post1.png") },
    { id: "11", image: require("@/assets/images/post2.png") },
    { id: "12", image: require("@/assets/images/post1.png") },
  ];

  const renderPostItem = ({ item }: { item: any }) => (
    <TouchableOpacity className="flex-1 m-0.5" style={{ aspectRatio: 1 }}>
      <Image
        source={item.image}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
        }}
        contentFit="cover"
        onError={(error) => console.log("Image error:", error)}
      />
    </TouchableOpacity>
  );

  return (
    <Screen  className="">
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
            className="rounded-full"
            style={{ width: rV(70), height: rV(70) }}
          >
            <Image
              source={require("@/assets/images/profile-img.jpg")}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 100,
              }}
              contentFit="cover"
              onError={(error) => console.log("Image error:", error)}
            />
          </View>

          <View className="ml-4 flex-1">
            <Text
              className="text-primary font-[PoppinsBold]"
              style={{ fontSize: rS(16) }}
            >
              Namaha Chandra
            </Text>
            <Text
              className="font-[PoppinsSemiBold] text-gray-600"
              style={{ fontSize: rS(12) }}
            >
              Arsenal, London
            </Text>
          </View>
        </View>

        {/* Bio */}
        <View className="mb-4">
          <Text
            className="font-[PoppinsMedium] text-gray-700"
            style={{ fontSize: rS(12) }}
          >
            I'm a positive person. I love to travel and eat{"\n"}Always
            available for chat
          </Text>
        </View>

        {/* Edit Profile Button */}
        <View className="mb-4">
          <CustomButton primary title="Edit Profile" onPress={()=>{
            router.push("/profilepage/edit-profile")
          }} />
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
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        />
      </View>
    </Screen>
  );
};

export default ProfilePage;