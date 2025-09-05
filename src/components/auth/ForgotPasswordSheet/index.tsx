import { useForgotPasswordApi } from "@/src/api-services/authApi/authMutation";
import CustomButton from "@/src/CustomComps/CustomButton";
import CustomInput from "@/src/CustomComps/CustomInput";
import useAuthStore from "@/src/store/authStore";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, View } from "react-native";

const ForgotPasswordSheet = ({
  handleForgotPassswordClose,
  handleResetPassswordOpen,
}: any) => {
  const setUserRegOtps = useAuthStore((state) => state.setUserRegOtps);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    if (data) {
      Keyboard.dismiss();
      forgotPasswordEmail.mutate({
        email: data?.email.toLowerCase(),
      });
      setUserRegOtps({
        email: data.email.toLowerCase(),
      });
    }
  };

  const forgotPasswordEmail = useForgotPasswordApi(handleResetPassswordOpen);

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
      </View>

      <View className=" mt-10">
        <CustomButton
          rounded
          title="Send Code"
          loading={forgotPasswordEmail.isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default ForgotPasswordSheet;
