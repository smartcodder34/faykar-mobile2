// import { useEditUser } from "@/src/api-services/authApi/authMutation";
// import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
// import CustomButton from "@/src/CustomComps/CustomButton";
// import CustomInput from "@/src/CustomComps/CustomInput";
// import CustomSelect from "@/src/CustomComps/CustomSelect";
// import Screen from "@/src/layout/Screen";
// import { rS, rV } from "@/src/lib/responsivehandler";
// import {
//     AntDesign,
//     EvilIcons,
//     Feather,
//     FontAwesome,
//     Ionicons,
// } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Controller, useForm } from "react-hook-form";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";

// interface Item {
//   title: string;
//   value: string;
//   price?: string;
// }

// const EditProfileScreen = () => {
//   const router = useRouter();
//   const getUserData = useGetUserApi();
//   const [openDropDown, setOpenDropDown] = React.useState(false);
//   const [selected, setSelected] = React.useState<Item | null>(null);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors, isValid },
//   } = useForm({
//     mode: "onChange",
//     defaultValues: {
//       full_name: "",
//       email: "",
//       phone_number: "",
//       bio: "",
//       region: "",
//       gender: "",
//     },
//   });

//   const dataItem = [
//     { title: "Female", value: "female" },
//     { title: "Male", value: "male" },
//     { title: "Intersex", value: "Intersex" },
//     // { title: "Farmer", value: "Farmer" },
//   ];

//   console.log("getUserData:", getUserData?.data?.data);

//   React.useEffect(() => {
//     if (getUserData?.data) {
//       reset({
//         full_name: getUserData?.data?.data?.full_name,
//         phone_number: getUserData?.data?.data?.phone_number?.toString() || "",
//         email: getUserData?.data?.data?.email,
//       });
//     }
//   }, [getUserData?.data, reset]);

//   const onSubmit = (data: any) => {
//     console.log("Form Data:", data);
//     editUserProfile.mutate({
//       full_name: data.full_name || getUserData?.data?.data?.full_name,
//       email: data.email || getUserData?.data?.data?.email,
//       phone_number: data.phone_number || getUserData?.data?.data?.phone_number,
//       region: data.region,
//       bio: "",
//       gender: selected?.value || "",
//     });
//   };
//   const editUserProfile = useEditUser();

//   return (
//     <Screen scroll={true} className="">
//       <View className="flex-row items-center justify-between p-4 bg-white">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="chevron-back" size={24} color="#2E6939" />
//         </TouchableOpacity>
//         <View>
//           <Text
//             className="font-[InterSemiBold] text-primary"
//             style={{ fontSize: rS(18) }}
//           >
//             My Profile
//           </Text>
//         </View>

//         <View className="w-6" />
//       </View>

//       <View className=" px-8 bg-white">
//         <View className="flex-row items-center">
//           <View
//             className="rounded-full"
//             style={{ width: rV(70), height: rV(70) }}
//           >
//             <Image
//               source={require("@/assets/images/profile-img.jpg")}
//               style={{
//                 height: "100%",
//                 width: "100%",
//                 borderRadius: 100,
//               }}
//               contentFit="cover"
//               onError={(error) => console.log("Image error:", error)}
//             />
//           </View>

//           <View className="ml-4 flex-1">
//             <Text
//               className="text-primary font-[PoppinsBold]"
//               style={{ fontSize: rS(16) }}
//             >
//               Namaha Chandra
//             </Text>
//             <Text
//               className="font-[PoppinsSemiBold] text-gray-600"
//               style={{ fontSize: rS(12) }}
//             >
//               Arsenal, London
//             </Text>
//           </View>
//         </View>

//         <View className="  mt-5">
//           <View>
//             <Controller
//               control={control}
//               name="full_name"
//               rules={{
//                 required: "fullname is required",
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomInput
//                   primary
//                   label="Full Name"
//                   placeholder="Enter your full name"
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   value={value}
//                   error={errors.full_name?.message}
//                   iconPostion="left"
//                   icon={
//                     <View className="mx-3">
//                       <AntDesign name="user" size={24} color="#2E6939" />
//                     </View>
//                   }
//                 />
//               )}
//             />
//           </View>

//           <View className="mt-2">
//             <Controller
//               control={control}
//               name="email"
//               rules={{
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address",
//                 },
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomInput
//                   primary
//                   label="Email"
//                   placeholder="Enter your email or phone number"
//                   // iconPostion="left"
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   value={value}
//                   error={errors.email?.message}
//                   leftIcon={
//                     <View className="mx-3">
//                       <AntDesign name="mail" size={24} color="#2E6939" />
//                     </View>
//                   }
//                 />
//               )}
//             />
//           </View>

//           <View className="mt-2 ">
//             <Controller
//               control={control}
//               name="phone_number"
//               rules={{
//                 required: "Phone number is required",
//                 minLength: {
//                   value: 10,
//                   message: "Phone Number must be 12 digits",
//                 },
//                 maxLength: {
//                   value: 12,
//                   message: "Phone Number must not exceed 12 digits",
//                 },
//               }}
//               render={({
//                 field: { value, onChange, onBlur },
//                 fieldState: { error },
//               }) => (
//                 <CustomInput
//                   label="Phone Number."
//                   primary
//                   placeholder="+4456664440"
//                   keyboardType={"numeric"}
//                   value={value}
//                   // onChangeText={onChange}
//                   onChangeText={(text: any) => {
//                     if (text?.length <= 12) {
//                       onChange(text);
//                     }
//                   }}
//                   error={errors?.phone_number?.message}
//                   icon={
//                     <View className="mx-3">
//                       <Feather name="phone" size={24} color="#2E6939" />
//                     </View>
//                   }
//                   iconPostion="left"
//                 />
//               )}
//             />
//           </View>

//           <View className="mt-3">
//             <CustomSelect
//               label="Sex"
//               primary
//               selected={selected}
//               setSelected={setSelected}
//               openDropDown={openDropDown}
//               setOpenDropDown={setOpenDropDown}
//               placeholder="Choose your sex"
//               dataItem={dataItem}
//               icon={
//                 <View className="mx-3">
//                   <FontAwesome name="intersex" size={24} color="#2E6939" />
//                 </View>
//               }
//               // style={{ borderRadius: 100 }}
//             />
//           </View>

//           <View className="mt-5">
//             <Controller
//               control={control}
//               name="region"
//               rules={{
//                 required: "region is required",
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <CustomInput
//                   primary
//                   label="Region"
//                   placeholder="Enter your region"
//                   // iconPostion="left"
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   value={value}
//                   error={errors.region?.message}
//                   leftIcon={
//                     <View className="mx-3">
//                       <EvilIcons name="location" size={24} color="#2E6939" />
//                     </View>
//                   }
//                 />
//               )}
//             />
//           </View>

//           <View className="mt-3 mb-5">
//             <Text
//               className=" font-[PoppinsMedium] text-black "
//               style={{ fontSize: rS(12) }}
//             >
//               About
//             </Text>

//             <View className=" h-20 mt-3 border border-[#B4B4B4] bg-onsurface rounded-lg p-4">
//               <TextInput multiline placeholder="Bio" />
//             </View>
//           </View>
//         </View>
//       </View>

//       <View className="p-8">
//         <CustomButton primary title="Update" onPress={handleSubmit(onSubmit)} />
//       </View>
//     </Screen>
//   );
// };

// export default EditProfileScreen;

import { useEditUser } from "@/src/api-services/authApi/authMutation";
import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
import CustomButton from "@/src/CustomComps/CustomButton";
import CustomInput from "@/src/CustomComps/CustomInput";
import CustomSelect from "@/src/CustomComps/CustomSelect";
import LoadingOverlay from "@/src/CustomComps/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import {
  AntDesign,
  EvilIcons,
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

 const dataItem = [
   { title: "Female", value: "female" },
   { title: "Male", value: "male" },
   { title: "Others", value: "others" },
 ];

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

 

  console.log("getUserData:", getUserData?.data?.data);

  console.log("selected:", selected);

  React.useEffect(() => {
    if (getUserData?.data) {
      const userData = getUserData.data.data.gender;
      reset({
        full_name: getUserData?.data?.data?.full_name,
        email: getUserData?.data?.data?.email,
        bio: getUserData?.data?.data?.bio || "",
        region: getUserData?.data?.data?.region || "",
      });
      const matchingGender = dataItem.find(
        (item) => item.value === userData
      );
      setSelected(matchingGender || null);
    }
  }, [getUserData?.data, reset]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    editUserProfile.mutate({
      full_name: data.full_name || getUserData?.data?.data?.full_name,
      email: data.email || getUserData?.data?.data?.email,
      region: data.region || getUserData?.data?.data?.region,
      bio: data.bio || getUserData?.data?.data?.bio,
      gender: selected?.value || "",
    });
  };

  const editUserProfile = useEditUser();
  console.log("editUserProfile:", editUserProfile);

  return (
    <Screen scroll={true} className="">
      <LoadingOverlay
        isOpen={editUserProfile.isPending} // Required: Controls visibility
        message="Custom message" // Optional: Loading text
        animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
        backdropClassName="..." // Optional: Additional backdrop styling
      />
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[InterSemiBold] text-primary"
            style={{ fontSize: rS(18) }}
          >
            Edit Profile
          </Text>
        </View>
        <View className="w-6" />
      </View>

      {/* Profile Image Section */}
      <View className="px-8 py-4 bg-white">
        <View className="flex-row items-center mb-6">
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
              {getUserData?.data?.data?.full_name}
            </Text>
            <TouchableOpacity>
              <Text
                className="font-[PoppinsSemiBold] text-primary"
                style={{ fontSize: rS(12) }}
              >
                Change Profile Picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View className="space-y-4">
          <Controller
            control={control}
            name="full_name"
            rules={{
              required: "Full name is required",
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
                placeholder="Enter your email"
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

          <View className="mt-3">
            <CustomSelect
              label="Gender"
              primary
              selected={selected}
              setSelected={setSelected}
              openDropDown={openDropDown}
              setOpenDropDown={setOpenDropDown}
              placeholder="Choose your gender"
              dataItem={dataItem}
              icon={
                <View className="mx-3">
                  <FontAwesome name="intersex" size={24} color="#2E6939" />
                </View>
              }
            />
          </View>

          <Controller
            control={control}
            name="region"
            rules={{
              required: "Region is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                label="Region"
                placeholder="Enter your region"
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

          {/* Bio Section - Fixed multiline */}
          <View className="mt-3 mb-5">
            <Text
              className="mb-2 font-[PoppinsMedium] text-black"
              style={{ fontSize: rS(12) }}
            >
              About
            </Text>

            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="border border-[#B4B4B4] bg-white rounded-lg p-4">
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Tell us about yourself..."
                    placeholderTextColor="#9B9B9B"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={{
                      fontSize: rS(14),
                      color: "#000",
                      textAlignVertical: "top",
                      minHeight: rV(80),
                    }}
                  />
                </View>
              )}
            />
            {errors.bio && (
              <Text
                className="text-red-500 mt-2 px-2 font-[PoppinsLight]"
                style={{ fontSize: rS(10) }}
              >
                {errors.bio?.message}
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Update Button */}
      <View className="p-8 pb-12">
        <CustomButton
          primary
          title="Update Profile"
          onPress={handleSubmit(onSubmit)}
          loading={editUserProfile.isPending}
          disabled={editUserProfile.isPending}
        />
      </View>
    </Screen>
  );
};

export default EditProfileScreen;
