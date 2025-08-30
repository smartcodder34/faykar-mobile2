import { useEditUser } from "@/src/api-services/authApi/authMutation";
import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
import CustomButton from "@/src/CustomComps/CustomButton";
import CustomInput from "@/src/CustomComps/CustomInput";
import CustomSelect from "@/src/CustomComps/CustomSelect";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import {
    AntDesign,
    EvilIcons,
    Feather,
    FontAwesome,
    Ionicons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface Item {
  title: string;
  value: string;
  price?: string;
}

const EditProfileScreen = () => {
  const router = useRouter();
  const getUserData = useGetUserApi();
  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [selected, setSelected] = React.useState<Item | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      bio: "",
      region: "",
      gender: "",
    },
  });

  const dataItem = [
    { title: "Female", value: "female" },
    { title: "Male", value: "male" },
    { title: "Intersex", value: "Intersex" },
    // { title: "Farmer", value: "Farmer" },
  ];

  console.log("getUserData:", getUserData?.data?.data);

  React.useEffect(() => {
    if (getUserData?.data) {
      reset({
        full_name: getUserData?.data?.data?.full_name,
        phone_number: getUserData?.data?.data?.phone_number?.toString() || "",
        email: getUserData?.data?.data?.email,
      });
    }
  }, [getUserData?.data, reset]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    editUserProfile.mutate({
      full_name: data.full_name || getUserData?.data?.data?.full_name,
      email: data.email || getUserData?.data?.data?.email,
      phone_number: data.phone_number || getUserData?.data?.data?.phone_number,
      region: data.region,
      bio: "",
      gender: selected?.value || "",
    });
  };
  const editUserProfile = useEditUser();

  return (
    <Screen scroll className="">
      <View className="flex-row items-center justify-between p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[InterSemiBold] text-primary"
            style={{ fontSize: rS(18) }}
          >
            My Profile
          </Text>
        </View>

        <View className="w-6" />
      </View>

      <View className=" px-8 bg-white">
        <View className="flex-row items-center">
          <View
            className="rounded-full"
            style={{ width: rV(70), height: rV(70) }}
          >
            <Image
              source={require("@/assets/images/profile-img.jpg")}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 100,
              }}
              contentFit="cover"
              onError={(error) => console.log("Image error:", error)}
            />
          </View>

          <View className="ml-4 flex-1">
            <Text
              className="text-primary font-[PoppinsBold]"
              style={{ fontSize: rS(16) }}
            >
              Namaha Chandra
            </Text>
            <Text
              className="font-[PoppinsSemiBold] text-gray-600"
              style={{ fontSize: rS(12) }}
            >
              Arsenal, London
            </Text>
          </View>
        </View>

        <View className="  mt-5">
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

          <View className="mt-2">
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

          <View className="mt-2 ">
            <Controller
              control={control}
              name="phone_number"
              rules={{
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Phone Number must be 12 digits",
                },
                maxLength: {
                  value: 12,
                  message: "Phone Number must not exceed 12 digits",
                },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <CustomInput
                  label="Phone Number."
                  primary
                  placeholder="+4456664440"
                  keyboardType={"numeric"}
                  value={value}
                  // onChangeText={onChange}
                  onChangeText={(text: any) => {
                    if (text?.length <= 12) {
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

          <View className="mt-3">
            <CustomSelect
              label="Sex"
              primary
              selected={selected}
              setSelected={setSelected}
              openDropDown={openDropDown}
              setOpenDropDown={setOpenDropDown}
              placeholder="Choose your sex"
              dataItem={dataItem}
              icon={
                <View className="mx-3">
                  <FontAwesome name="intersex" size={24} color="#2E6939" />
                </View>
              }
              // style={{ borderRadius: 100 }}
            />
          </View>

          <View className="mt-5">
            <Controller
              control={control}
              name="region"
              rules={{
                required: "region is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  label="Region"
                  placeholder="Enter your region"
                  // iconPostion="left"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.region?.message}
                  leftIcon={
                    <View className="mx-3">
                      <EvilIcons name="location" size={24} color="#2E6939" />
                    </View>
                  }
                />
              )}
            />
          </View>

          <View className="mt-3 mb-5">
            <Text
              className=" font-[PoppinsMedium] text-black "
              style={{ fontSize: rS(12) }}
            >
              About
            </Text>

            <View className=" h-20 mt-3 border border-[#B4B4B4] bg-onsurface rounded-lg p-4">
              <TextInput multiline placeholder="Bio" />
            </View>
          </View>
        </View>
      </View>

      <View className="p-8">
        <CustomButton primary title="Update" onPress={handleSubmit(onSubmit)} />
      </View>
    </Screen>
  );
};

export default EditProfileScreen;
