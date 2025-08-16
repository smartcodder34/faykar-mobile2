import OtpPin from "@/src/components/auth/OtpPin";
import RegisterSuccessSheet from "@/src/components/auth/RegisterSuccessSheet";
import BottomSheetScreen from "@/src/CustomComps/BottomSheetScreen";
import CustomButton from "@/src/CustomComps/CustomButton";
import Screen from "@/src/layout/Screen";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Verification = () => {
  const router = useRouter();
  const [value, setValue] = React.useState("");

  // bottom sheet
  const snapPoints = useMemo(() => ["30%", "50%"], []);
  //open the bottom sheet

  const verifybottomSheetRef = React.useRef<BottomSheet>(null);
  //close the bottom sheet
  const handleVerifyBottomSheetOpen = () =>
    verifybottomSheetRef.current?.expand();
  const handleVerifyBottomSheetClose = () =>
    verifybottomSheetRef.current?.close();

  return (
    <Screen className=" ">
      <View className=" flex-row items-center justify-between p-8">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>

        <View>
          <Text className=" text-base font-[PlusJakartaSansSemiBold]">
            Verification
          </Text>
        </View>
        <View />
      </View>
      <View className=" h-0.5 bg-[#D9D9D9]" />

      <View className="p-8 items-center ">
        <View className=" w-40 h-40 my-12 ">
          <Image
            source={require("@/assets/images/lock.png")}
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

        <Text
          className="my-5 text-xl font-[PlusJakartaSansSemiBold]"
          onPress={handleVerifyBottomSheetOpen}
        >
          Verification Code
        </Text>

        <View className=" items-center mt-10">
          <Text className=" text-[#8E8E93] font-[PlusJakartaSansRegular]">
            We have sent the verification code to
          </Text>
          <Text className=" my-3">robert.adams@email.com</Text>
        </View>
      </View>

      <View className=" my-8">
        <OtpPin value={value} setValue={setValue} />
      </View>

      <View className="p-8">
        <CustomButton rounded title="Submit" />
        <Text className="text-center my-2">
          Didn’t received the code? Resend
        </Text>
      </View>

      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={verifybottomSheetRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        message={
          <RegisterSuccessSheet
            // selectedDate={selectedDate}
            // setSelectedDate={setSelectedDate}
            handleVerifyBottomSheetClose={handleVerifyBottomSheetClose}
          />
        }
      />
    </Screen>
  );
};

export default Verification;
