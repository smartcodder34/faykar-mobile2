import CustomButton from '@/src/CustomComps/CustomButton';
import CustomInput from '@/src/CustomComps/CustomInput';
import Screen from '@/src/layout/Screen';
import { AntDesign, Feather } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const CreateAccount = () => {
    const router = useRouter()
  return (
    <Screen className="">
      <View className=" flex-1 p-8">
        <Text className="font-[PlusJakartaSansSemiBold] text-xl my-3">
          Create Account
        </Text>

        <Text className="font-[PlusJakartaSansRegular] text-sm text-[#8E8E93]">
          Start learning with create your account
        </Text>

        <View className="mt-10">
          <View>
            <CustomInput
              primary
              label="Username"
              placeholder="Create your username"
              iconPostion="left"
              icon={
                <View className="mx-3">
                  <AntDesign name="user" size={24} color="black" />
                </View>
              }
            />
          </View>

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

          <View className="mt-5">
            <CustomInput
              primary
              label="Password"
              placeholder="Create your password"
              iconPostion="left"
              icon={
                <View className="mx-3">
                  <Feather name="lock" size={24} color="black" />
                </View>
              }
            />
          </View>
        </View>

        <View className="py-8 my-5">
          <CustomButton rounded title="Create Account" onPress={()=>{
            router.push("/(auth)/create-account/verification")
          }} />
        </View>

        <View className=" items-center my-5">
          <Text className="text-[#8E8E93]">Or continue with</Text>
        </View>

        <View className="flex-row mx-auto my-10">
          <TouchableOpacity className=" w-16 h-16 mx-10">
            <Image
              source={require("@/assets/images/facebook.png")}
              style={{
                height: "100%",
                width: "100%",
                // alignSelf: "center",
                // borderRadius: 100,
              }}
              contentFit="contain"
              onError={(error) => console.log("Image error:", error)}
            />
          </TouchableOpacity>

          <TouchableOpacity className=" w-16 h-16 mx-10">
            <Image
              source={require("@/assets/images/google.png")}
              style={{
                height: "100%",
                width: "100%",
                // alignSelf: "center",
                // borderRadius: 100,
              }}
              contentFit="contain"
              onError={(error) => console.log("Image error:", error)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

export default CreateAccount