// import CustomButton from "@/src/CustomComps/CustomButton";
// import Screen from "@/src/layout/Screen";
// import useAuthStore from "@/src/store/authStore";
// import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import React from "react";
// import { Alert, Text, TouchableOpacity, View } from "react-native";

// const SettingsScreen = () => {
//   const router = useRouter();

//   const settingData = [
//     {
//       id: 1,
//       title: "Settings",
//       leftIcon: <FontAwesome name="edit" size={24} color="black" />,
//       rightIcon: <Ionicons name="chevron-forward" size={24} color="black" />,
//     },
//     {
//       id: 2,
//       title: "Language",
//       leftIcon: <MaterialIcons name="language" size={24} color="black" />,
//       rightIcon: <Ionicons name="chevron-forward" size={24} color="black" />,
//     },
//     {
//       id: 3,
//       title: "Friends",
//       leftIcon: <AntDesign name="user" size={24} color="black" />,
//       rightIcon: <Ionicons name="chevron-forward" size={24} color="black" />,
//     },
    
//   ];

//   const handlelogout = () => {
//     Alert.alert("Logout!", "Are you sure you want to logout?", [
//       {
//         text: "Cancel",
//         onPress: () => {},
//       },
//       {
//         text: "Ok",
//         onPress: async () => {
//           // Use the auth store's logout method
//           useAuthStore.getState().clearAuthState();
//           router.replace("/(auth)/login");
//         },
//       },
//     ]);
//   };
//   return (
//     <Screen className="p-8">
//       <View className=" flex-row items-center justify-between ">
//         <TouchableOpacity onPress={() => {
//             router.back()
//         }}>
//           <Ionicons name="chevron-back" size={24} color="#2E6939" />
//         </TouchableOpacity>
//         <View>
//           <Text className="font-[InterSemiBold] text-2xl text-primary">
//             Settings
//           </Text>
//         </View>

//         <View />
//       </View>

//       <View className="flex-1">
//         <CustomButton primary title="Log out" onPress={handlelogout} />
//       </View>
//     </Screen>
//   );
// };

// export default SettingsScreen;


import CustomButton from "@/src/CustomComps/CustomButton";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import useAuthStore from "@/src/store/authStore";
import {
    AntDesign,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";

const SettingsScreen = () => {
  const router = useRouter();
  const [notificationEnabled, setNotificationEnabled] = React.useState(true);

  const mainSettingData = [
    {
      id: 1,
      title: "Edit Profile",
      leftIcon: <FontAwesome name="edit" size={20} color="#2E6939" />,
      rightIcon: <Ionicons name="chevron-forward" size={20} color="#666" />,
      onPress: () => router.push("/profilepage/edit-profile"),
    },
    {
      id: 2,
      title: "Language",
      leftIcon: <MaterialIcons name="language" size={20} color="#2E6939" />,
      rightIcon: (
        <View className="flex-row items-center">
          <Text className="text-gray-600 mr-2" style={{ fontSize: rS(12) }}>
            10+
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </View>
      ),
      onPress: () => {}, // Add navigation for language settings
    },
    {
      id: 3,
      title: "Friends",
      leftIcon: <AntDesign name="team" size={20} color="#2E6939" />,
      rightIcon: (
        <View className="flex-row items-center">
          <Text className="text-gray-600 mr-2" style={{ fontSize: rS(12) }}>
            1000+
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </View>
      ),
      onPress: () => {}, // Add navigation for friends
    },
  ];

  const preferencesData = [
    {
      id: 1,
      title: "Notification",
      leftIcon: (
        <Ionicons name="notifications-outline" size={20} color="#2E6939" />
      ),
      rightIcon: (
        <Switch
          trackColor={{ false: "#D1D5DB", true: "#2E6939" }}
          thumbColor={notificationEnabled ? "#ffffff" : "#ffffff"}
          ios_backgroundColor="#D1D5DB"
          onValueChange={setNotificationEnabled}
          value={notificationEnabled}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      ),
      onPress: () => {},
    },
    {
      id: 2,
      title: "Fakar Help",
      leftIcon: (
        <MaterialCommunityIcons
          name="help-circle-outline"
          size={20}
          color="#2E6939"
        />
      ),
      rightIcon: <Ionicons name="chevron-forward" size={20} color="#666" />,
      onPress: () => {}, // Add navigation for help
    },
    {
      id: 3,
      title: "About",
      leftIcon: (
        <Ionicons name="information-circle-outline" size={20} color="#2E6939" />
      ),
      rightIcon: <Ionicons name="chevron-forward" size={20} color="#666" />,
      onPress: () => {}, // Add navigation for about
    },
  ];

  const handlelogout = () => {
    Alert.alert("Logout!", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Ok",
        onPress: async () => {
          useAuthStore.getState().clearAuthState();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const renderSettingItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      className="flex-row items-center justify-between py-4 px-4"
      onPress={item.onPress}
      style={{ minHeight: rV(56) }}
    >
      <View className="flex-row items-center flex-1">
        <View className="mr-4">{item.leftIcon}</View>
        <Text
          className="font-[PoppinsMedium] text-black flex-1"
          style={{ fontSize: rS(14) }}
        >
          {item.title}
        </Text>
      </View>

      <View>{item.rightIcon}</View>
    </TouchableOpacity>
  );

  return (
    <Screen className="bg-gray-50">
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
            Settings
          </Text>
        </View>
        <View className="w-6" />
      </View>

      <View className="flex-1 px-4 pt-4">
        {/* Main Settings Section */}
        <View className="bg-white rounded-xl mb-4 overflow-hidden">
          {mainSettingData.map((item, index) => (
            <View key={item.id}>
              {renderSettingItem(item)}
              {index < mainSettingData.length - 1 && (
                <View className="h-px bg-gray-100 ml-12" />
              )}
            </View>
          ))}
        </View>

        {/* Preferences Section */}
        <View className="mb-6">
          <Text
            className="font-[PoppinsBold] text-black mb-3 px-2"
            style={{ fontSize: rS(16) }}
          >
            Preferences
          </Text>

          <View className="bg-white rounded-xl overflow-hidden">
            {preferencesData.map((item, index) => (
              <View key={item.id}>
                {renderSettingItem(item)}
                {index < preferencesData.length - 1 && (
                  <View className="h-px bg-gray-100 ml-12" />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View className="mt-20 mb-8">
          <CustomButton primary title="Log out" onPress={handlelogout} />
        </View>
      </View>
    </Screen>
  );
};

export default SettingsScreen;