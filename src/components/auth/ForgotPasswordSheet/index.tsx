import CustomButton from "@/src/CustomComps/CustomButton";
import CustomInput from "@/src/CustomComps/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";


const ForgotPasswordSheet = ({ handleForgotPassswordClose }: any) => {
  return (
    <View className="p-8">
      <View>
        <Text className="font-[PlusJakartaSansSemiBold] text-xl my-3">
          Forgot Password
        </Text>

        <Text className="font-[PlusJakartaSansRegular] text-sm text-[#8E8E93]">
          Enter your email or phone number
        </Text>
      </View>

      <View className=" my-5">
        <View className="mt-5">
          <CustomInput
            primary
            label="Email or Phone Number"
            placeholder="Enter your email or phone number"
            iconPostion="left"
            icon={
              <View className="mx-3">
                <AntDesign name="mail" size={24} color="black" />
              </View>
            }
          />
        </View>
      </View>

      <View className=" mt-10">
        <CustomButton rounded title="Send Code" />
      </View>
    </View>
  );
};

export default ForgotPasswordSheet;
