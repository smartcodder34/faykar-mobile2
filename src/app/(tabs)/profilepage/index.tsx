import CustomButton from "@/src/CustomComps/CustomButton";
import Screen from "@/src/layout/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProfilePage = () => {
  const router = useRouter();

  return (
    <Screen className="p-8">
      <View className=" flex-row items-center justify-between ">
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text className="font-[InterSemiBold] text-2xl text-primary">
            Profile
          </Text>
        </View>

        <View />
      </View>

      <View className=" pt-8 flex-row items-center justify-between my-5">
        <View className=" flex-row items-center">
          <View className=" rounded-full" style={{ width: 71, height: 71 }}>
            <Image
              source={require("@/assets/images/profile-img.jpg")}
              style={{
                height: "100%",
                width: "100%",
                // alignSelf: "center",
                borderRadius: 100,
              }}
              contentFit="cover"
              onError={(error) => console.log("Image error:", error)}
            />
          </View>

          <View className=" mx-5">
            <Text className=" text-xl text-primary font-[PoppinsBold]">
              Namaha Chandra
            </Text>
            <Text className=" text-sm font-[PoppinsSemiBold]">
              Arsenal, London
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            router.push("/profilepage/settings");
          }}
        >
          <Ionicons name="settings-outline" size={24} color="#2E6939" />
        </TouchableOpacity>
      </View>
      <View className=" mb-5">
        <Text className=" text-sm font-[PoppinsMedium]">
          I’m a postive person. I love to travel and eat Always available for
          chat
        </Text>
      </View>

      <View className="">
        <CustomButton primary title="Edit Profile" />
      </View>
    </Screen>
  );
};

export default ProfilePage;
