import { useRegisterSocialUser, useRegisterUser } from "@/src/api-services/authApi/authMutation";
import CustomButton from "@/src/CustomComps/CustomButton";
import CustomInput from "@/src/CustomComps/CustomInput";
import LoadingOverlay from "@/src/CustomComps/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import useAuthStore from "@/src/store/authStore";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const CreateAccount = () => {
  const router = useRouter();
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
  const [comPassIsSecureEntry, setComPassIsSecureEntry] = React.useState(true);

  const setUserRegOtps = useAuthStore((state) => state.setUserRegOtps);

  const registerUser = useRegisterUser();
  const registerSocialDetails = useRegisterSocialUser();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      phone_number: "",
      password_confirmation: "",
    },
  });

  const pwd = watch("password");

  const onSubmit = (data: any) => {
    if (data) {
      registerUser.mutate(data);
      setUserRegOtps({
        email: data.email.toLowerCase(),
      });
      console.log("testing234: ", data);
    }
  };

  // console.log("registerUser:", registerUser);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        // setState({ userInfo: response.data });
        console.log("User Info --> ", response.data);
        registerSocialDetails.mutate({
          full_name: response.data?.user.name,
          phone_number: "+2348109302800",
          email: response.data?.user.email,
          provider:"google"
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

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.signOut();
  //     useAuthStore.getState().clearAuthState(); // Remember to remove the user from your app's state as well
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  console.log("testing1111: ", registerUser);

  return (
    <Screen scroll={true} className="">
      <LoadingOverlay
        isOpen={registerUser.isPending || registerSocialDetails.isPending} // Required: Controls visibility
        message="Custom message" // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      <View className=" flex-1 p-8">
        <Text className="font-[PlusJakartaSansSemiBold] text-xl my-3">
          Create Account
        </Text>

        <Text className="font-[PlusJakartaSansRegular] text-sm text-[#8E8E93]">
          Start learning with create your account
        </Text>

        <View className="mt-10">
          <View>
            <Controller
              control={control}
              name="full_name"
              rules={{
                required: "fullname is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  label="Full Name"
                  placeholder="Enter your full name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.full_name?.message}
                  iconPostion="left"
                  icon={
                    <View className="mx-3">
                      <AntDesign name="user" size={24} color="#2E6939" />
                    </View>
                  }
                />
              )}
            />
          </View>

          <View className="mt-5">
            <Controller
              control={control}
              name="phone_number"
              rules={{
                required: "Phone number is required",
                minLength: {
                  value: 14,
                  message: "Phone Number must be 14 digits",
                },
                maxLength: {
                  value: 14,
                  message: "Phone Number must not exceed 14 digits",
                },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <CustomInput
                  label="Phone Number"
                  primary
                  placeholder="+4456664440"
                  // keyboardType={"numeric"}
                  value={value}
                  // onChangeText={onChange}
                  onChangeText={(text: any) => {
                    if (text?.length <= 14) {
                      onChange(text);
                    }
                  }}
                  error={errors?.phone_number?.message}
                  icon={
                    <View className="mx-3">
                      <Feather name="phone" size={24} color="#2E6939" />
                    </View>
                  }
                  iconPostion="left"
                />
              )}
            />
          </View>

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
                  label="Email or Phone Number"
                  placeholder="Enter your email or phone number"
                  // iconPostion="left"
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
                required: "passowrd is required",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.,]{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, and a number.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  label="Password"
                  placeholder="Enter your Password"
                  secureTextEntry={isSecureEntry}
                  // iconPostion="left"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.password?.message}
                  leftIcon={
                    <View className="mx-3">
                      <Feather name="lock" size={24} color="#717171" />
                    </View>
                  }
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => {
                        setIsSecureEntry(!isSecureEntry);
                      }}
                    >
                      {isSecureEntry ? (
                        <Feather name="eye-off" size={24} color="#717171" />
                      ) : (
                        <Feather name="eye" size={24} color="#717171" />
                      )}
                    </TouchableOpacity>
                  }
                />
              )}
            />
          </View>

          <View className="mt-5">
            <Controller
              control={control}
              name="password_confirmation"
              rules={{
                required: "confirm Password is required",
                validate: (value) => value === pwd || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  label="Re-type password"
                  placeholder="confirm password"
                  secureTextEntry={comPassIsSecureEntry}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password_confirmation?.message}
                  leftIcon={
                    <View className="mx-3">
                      <Feather name="lock" size={24} color="#717171" />
                    </View>
                  }
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => {
                        setComPassIsSecureEntry(!comPassIsSecureEntry);
                      }}
                    >
                      {isSecureEntry ? (
                        <Feather name="eye-off" size={24} color="#717171" />
                      ) : (
                        <Feather name="eye" size={24} color="#717171" />
                      )}
                    </TouchableOpacity>
                  }
                />
              )}
            />
          </View>
        </View>

        <View className="py-8">
          <CustomButton
            rounded
            title="Create Account"
            // onPress={() => {
            //   router.push("/(auth)/create-account/verification");
            // }}
            onPress={handleSubmit(onSubmit)}
            loading={registerUser.isPending || registerSocialDetails.isPending}
            disabled={registerUser.isPending}
          />

          <Text className=" text-center my-3">
            Already have an account?{" "}
            <Text
              className=" text-primary font-[PlusJakartaSansSemiBold]"
              onPress={() => router.push("/(auth)/login")}
              // onPress={signOut}
            >
              Sign in
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
    </Screen>
  );
};

export default CreateAccount;
