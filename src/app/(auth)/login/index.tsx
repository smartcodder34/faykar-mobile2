import {
  useLoginSocialUser,
  useLoginUser,
} from "@/src/api-services/authApi/authMutation";
import ForgotPasswordSheet from "@/src/components/auth/ForgotPasswordSheet";
import ResetPasswordSheet from "@/src/components/auth/ResetPasswordSheet";
import BottomSheetScreen from "@/src/CustomComps/BottomSheetScreen";
import CustomButton from "@/src/CustomComps/CustomButton";
import CustomInput from "@/src/CustomComps/CustomInput";
import LoadingOverlay from "@/src/CustomComps/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";

const LoginScreen = () => {
  const router = useRouter();
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    Keyboard.dismiss();
    userLogin.mutate({
      email: data?.email.toLowerCase(),
      password: data?.password,
    });
  };

  const userLogin = useLoginUser();
  const loginSocialDetails = useLoginSocialUser();

  console.log("userLogin:", userLogin);

  // bottom sheet
  const snapPoints = useMemo(() => ["30%", "50%"], []);
  //open the bottom sheet

  const forgotPasswordRef = React.useRef<BottomSheet>(null);
  //close the bottom sheet
  const handleForgotPassswordOpen = () => forgotPasswordRef.current?.expand();
  const handleForgotPassswordClose = () => forgotPasswordRef.current?.close();

  const resetPasswordRef = React.useRef<BottomSheet>(null);
  //close the bottom sheet
  const handleResetPassswordOpen = () => {
    resetPasswordRef.current?.expand();
    handleForgotPassswordClose();
  };
  const handleResetPassswordClose = () => resetPasswordRef.current?.close();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        // setState({ userInfo: response.data });
        console.log("User Info --> ", response.data);

        loginSocialDetails.mutate({
          email: response.data?.user.email,
          provider: "google",
        });
      } else {
        // sign in was cancelled by user
        console.log("sign in was cancelled by user");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <Screen scroll={true} className="">
      <LoadingOverlay
        isOpen={userLogin.isPending || loginSocialDetails.isPending} // Required: Controls visibility
        message="Custom message" // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      <View className=" flex-1 p-8">
        <Text className="font-[PlusJakartaSansSemiBold] text-xl my-3">
          Login
        </Text>

        <Text className="font-[PlusJakartaSansRegular] text-sm text-[#8E8E93]">
          Please login with registered account
        </Text>

        <View className="mt-5">
          <View className="mt-5">
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  label="Email"
                  placeholder="Enter your email or phone number"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.email?.message}
                  leftIcon={
                    <View className="mx-3">
                      <AntDesign name="mail" size={24} color="#2E6939" />
                    </View>
                  }
                />
              )}
            />
          </View>

          <View className="mt-5">
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  label="Password"
                  placeholder="Create your password"
                  secureTextEntry={isSecureEntry}
                  value={value}
                  error={errors.password?.message}
                  onChangeText={onChange}
                  iconPostion="left"
                  icon={
                    <View className="mx-3">
                      <Feather name="lock" size={24} color="#2E6939" />
                    </View>
                  }
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => {
                        setIsSecureEntry(!isSecureEntry);
                      }}
                    >
                      {isSecureEntry ? (
                        <Ionicons
                          name="eye-off-outline"
                          size={24}
                          color="#717171"
                        />
                      ) : (
                        <Ionicons
                          name="eye-outline"
                          size={24}
                          color="#717171"
                        />
                      )}
                    </TouchableOpacity>
                  }
                />
              )}
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
            title="Sign In"
            // onPress={() => {
            //   router.push("/(auth)/create-account/verification");
            // }}
            onPress={handleSubmit(onSubmit)}
            loading={userLogin.isPending || loginSocialDetails.isPending}
            disabled={userLogin.isPending}
          />
          <Text className=" text-center my-3">
            Dont have an account?{" "}
            <Text
              className=" text-primary font-[PlusJakartaSansSemiBold]"
              onPress={() => router.push("/(auth)/create-account")}
            >
              Sign up
            </Text>
          </Text>
        </View>

        <View className=" items-center">
          <Text className="text-[#8E8E93]">Or continue with</Text>
        </View>

        <View className="flex-row mx-auto my-3">
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

          <TouchableOpacity className=" w-16 h-16 mx-10" onPress={signIn}>
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
            handleResetPassswordOpen={handleResetPassswordOpen}
            handleForgotPassswordClose={handleForgotPassswordClose}
          />
        }
      />

      <BottomSheetScreen
        snapPoints={snapPoints}
        ref={resetPasswordRef}
        isBackdropComponent={true}
        enablePanDownToClose={true}
        index={-1}
        message={
          <ResetPasswordSheet
            // selectedDate={selectedDate}
            // setSelectedDate={setSelectedDate}
            handleResetPassswordClose={handleResetPassswordClose}
          />
        }
      />
    </Screen>
  );
};

export default LoginScreen;
