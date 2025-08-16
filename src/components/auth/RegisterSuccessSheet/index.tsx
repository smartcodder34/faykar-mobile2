import CustomButton from "@/src/CustomComps/CustomButton";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const RegisterSuccessSheet = ({ handleVerifyBottomSheetClose }: any) => {
  const router= useRouter()
  return (
    <View className="p-8">
      <View className=" items-center">
        <View className=" w-40 h-40  ">
          <Image
            source={require("@/assets/images/success.png")}
            style={{
              height: "100%",
              width: "100%",
              //   alignSelf: "center",
              // borderRadius: 100,
            }}
            contentFit="contain"
            onError={(error) => console.log("Image error:", error)}
          />
        </View>

        <View className="my-5 items-center">
          <Text className=" text-xl font-[PlusJakartaSansSemiBold]">
            Register Success
          </Text>

          <View className="my-3 items-center">
            <Text className=" text-sm font-[PoppinsMedium] text-[#9E9E9E]">
              Congratulation! Your account already account
            </Text>
            <Text className=" text-sm font-[PoppinsMedium] text-[#9E9E9E]">
              Please login to get amazing experience
            </Text>
          </View>
        </View>
      </View>

      <View>
        <CustomButton rounded title="Login" onPress={()=>{
          router.push("/(auth)/login")
          handleVerifyBottomSheetClose()
        }} />
      </View>
    </View>
  );
};

export default RegisterSuccessSheet;
