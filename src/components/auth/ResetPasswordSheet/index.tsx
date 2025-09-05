import { useResetPasswordApi } from "@/src/api-services/authApi/authMutation";
import CustomButton from "@/src/CustomComps/CustomButton";
import CustomInput from "@/src/CustomComps/CustomInput";
import useAuthStore from "@/src/store/authStore";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const ResetPasswordSheet = ({ handleForgotPassswordClose }: any) => {
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
  const [comPassIsSecureEntry, setComPassIsSecureEntry] = React.useState(true);
  const [isSecureEntryOtp, setIsSecureEntryOtp] = React.useState(true);

  const email = useAuthStore((state) => state.userRegOtps.email);

  const resetPasswordData = useResetPasswordApi();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      otp: "",
      password: "",
      password_confirmation: "",
    },
  });

  const pwd = watch("password");

  const onSubmit = async (data: any) => {
    const requestedPayload = {
      email: email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      otp: data.otp,
    };
    resetPasswordData.mutate(requestedPayload);
  };

  return (
    <View className="p-8">
      <View>
        <Text className="font-[PlusJakartaSansSemiBold] text-xl">
          Create New Password
        </Text>

        <Text className="font-[PlusJakartaSansRegular] text-sm text-[#8E8E93]">
          Enter your new password
        </Text>
      </View>

      <View className="">
        <View className="">
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

        <View className="">
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

        <View className="">
          <Controller
            control={control}
            name="otp"
            rules={{
              required: "Otp is required",
              minLength: {
                value: 4,
                message: "Otp should be at least 4 characters long",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Enter otp"
                placeholder="Enter OTP"
                secureTextEntry={isSecureEntryOtp}
                // iconPostion="left"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.otp?.message}
                leftIcon={
                  <View className="mx-3">
                    <Feather name="lock" size={24} color="#717171" />
                  </View>
                }
                rightIcon={
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntryOtp(!isSecureEntryOtp);
                    }}
                  >
                    {isSecureEntryOtp ? (
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

      <View className=" mt-5">
        <CustomButton
          rounded
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          loading={resetPasswordData.isPending}
        />
      </View>
    </View>
  );
};

export default ResetPasswordSheet;
