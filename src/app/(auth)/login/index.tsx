import ForgotPasswordSheet from '@/src/components/auth/ForgotPasswordSheet';
import BottomSheetScreen from '@/src/CustomComps/BottomSheetScreen';
import CustomButton from '@/src/CustomComps/CustomButton';
import CustomInput from '@/src/CustomComps/CustomInput';
import Screen from '@/src/layout/Screen';
import { AntDesign, Feather } from "@expo/vector-icons";
import BottomSheet from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const LoginScreen = () => {
  const router = useRouter();

  // bottom sheet
  const snapPoints = useMemo(() => ["30%", "50%"], []);
  //open the bottom sheet

  const forgotPasswordRef = React.useRef<BottomSheet>(null);
  //close the bottom sheet
  const handleForgotPassswordOpen = () => forgotPasswordRef.current?.expand();
  const handleForgotPassswordClose = () => forgotPasswordRef.current?.close();
  return (
    <Screen className="">
      <View className=" flex-1 p-8">
        <Text className="font-[PlusJakartaSansSemiBold] text-xl my-3">
          Login
        </Text>

        <Text className="font-[PlusJakartaSansRegular] text-sm text-[#8E8E93]">
          Please login with registered account
        </Text>

        <View className="mt-10">
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

            <TouchableOpacity
              className="my-5 items-end"
              onPress={handleForgotPassswordOpen}
            >
              <Text className=" text-primary font-[PlusJakartaSansSemiBold]">
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="py-8">
          <CustomButton
            rounded
            title="Create Account"
            onPress={() => {
              router.push("/(auth)/create-account/verification");
            }}
          />
        </View>

        <View className=" items-center my-5">
          <Text className="text-[#8E8E93]">Or continue with</Text>
        </View>

        <View className="flex-row mx-auto my-5">
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

      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={forgotPasswordRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        message={
          <ForgotPasswordSheet
            // selectedDate={selectedDate}
            // setSelectedDate={setSelectedDate}
            handleForgotPassswordClose={handleForgotPassswordClose}
          />
        }
      />
    </Screen>
  );
}

export default LoginScreen;