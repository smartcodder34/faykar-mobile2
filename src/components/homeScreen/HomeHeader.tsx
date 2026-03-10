import { useGetNotificationsApi } from "@/src/api-services/notificationsApi/notificationQuery";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const HomeHeader = () => {
  const router = useRouter();

  const { data: notifications, error } = useGetNotificationsApi();
  const notificationsList = notifications?.data?.notifications || [];

  const unreadCount = notificationsList.filter(
    (n: any) => n.read_at === null
  ).length;

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      <View className="w-40 h-10">
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ height: "100%", width: "100%" }}
          contentFit="contain"
        />
      </View>

      <View className="flex-row items-center space-x-3">
        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={() => router.push("/(tabs)/homepage/create-product")}
        >
          <Ionicons name="add" size={24} color="#2E6939" />
        </TouchableOpacity>

        <TouchableOpacity
          className="w-8 h-8 items-center justify-center"
          onPress={() => router.push("/(tabs)/homepage/notifications")}
        >
          <View>
            <Ionicons name="notifications-outline" size={24} color="#2E6939" />

            {unreadCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  minWidth: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: "#EF4444",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 4,
                }}
              >
                <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Ionicons name="paper-plane-outline" size={24} color="#2E6939" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
