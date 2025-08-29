import CustomButton from '@/src/CustomComps/CustomButton';
import Screen from '@/src/layout/Screen';
import useAuthStore from '@/src/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const ProfilePage = () => {
  const router = useRouter();

   const handlelogout = () => {
     Alert.alert("Logout!", "Are you sure you want to logout?", [
       {
         text: "Cancel",
         onPress: () => {},
       },
       {
         text: "Ok",
         onPress: async () => {
           // Use the auth store's logout method
           useAuthStore.getState().clearAuthState();
           router.replace("/(auth)/login");
         },
       },
     ]);
   };
  return (
    <Screen className="p-8">
      <View className=" flex-row items-center justify-between ">
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text className="font-[InterSemiBold] text-2xl text-primary">
            Settings
          </Text>
        </View>

        <View />
      </View>

      <View className="flex-1">
        <CustomButton primary title="Log out" onPress={handlelogout} />
      </View>
    </Screen>
  );
}

export default ProfilePage