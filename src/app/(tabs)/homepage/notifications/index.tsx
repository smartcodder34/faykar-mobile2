import {
  useGetNotificationsApi,
  useMarkNotificationAsReadApi,
} from "@/src/api-services/notificationsApi/notificationQuery";
import Screen from "@/src/layout/Screen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NotificationScreen = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // API Hooks
  const {
    data: notificationsResponse,
    isLoading,
    error,
    refetch,
  } = useGetNotificationsApi();

  console.log("notificationsResponse", notificationsResponse);
  // This hook triggers automatically when selectedId changes due to "enabled" property
  const markAsRead = useMarkNotificationAsReadApi(selectedId);

  React.useEffect(() => {
    if (selectedId) {
      // Optionally refetch notifications or update state here

      markAsRead.refetch();
    }
  }, [selectedId]);
  const notifications = notificationsResponse?.data?.notifications || [];

  const getNotificationIcon = (type: string) => {
    const iconSize = 16;
    switch (type) {
      case "product_created":
        return (
          <MaterialCommunityIcons
            name="package-variant-closed"
            size={iconSize}
            color="#16a34a"
          />
        );
      case "like":
        return <Ionicons name="heart" size={iconSize} color="#ef4444" />;
      case "comment":
        return (
          <Ionicons
            name="chatbubble-ellipses"
            size={iconSize}
            color="#2563eb"
          />
        );
      default:
        return (
          <Ionicons name="notifications" size={iconSize} color="#4b5563" />
        );
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleNotificationPress = (item: any) => {
    // Mark as read
    setSelectedId(item.id);

    // Get product_id from data field
    const productId = item?.data?.product_id;

    if (productId) {
      router.push({
        pathname: '/(tabs)/homepage/comments',
        params: { item: JSON.stringify(productId) },
      });
    }

    // Refetch to update read status
    refetch();
  };

  const renderItem = ({ item }: { item: any }) => {
    const isUnread = !item.read_at;
    const actorName = item.message.split(" ")[0] || "Someone";

    return (
      <TouchableOpacity
        onPress={() => handleNotificationPress(item)}
        className={`flex-row items-start p-4 border-b border-gray-50 ${
          isUnread ? "bg-green-50/40" : "bg-white"
        }`}
      >
        {/* Avatar Section */}
        <View className="mr-3">
          <View className="w-12 h-12 rounded-full bg-green-700 items-center justify-center">
            <Text className="text-white font-bold text-sm">
              {getInitials(actorName)}
            </Text>
          </View>
        </View>

        {/* Text Content */}
        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-2">
              <Text className="text-[14px] text-gray-900 leading-5">
                <Text className="font-bold">{actorName}</Text>{" "}
                {item.message.substring(actorName.length + 1)}
              </Text>

              <View className="flex-row items-center mt-2">
                {getNotificationIcon(item.type)}
                <Text className="text-xs text-gray-500 capitalize ml-1.5">
                  {item.type.replace("_", " ")}
                </Text>
              </View>
            </View>

            {/* Meta (Time & Status) */}
            <View className="items-end">
              <Text className="text-[10px] text-gray-400 mb-2">
                {item.created_at}
              </Text>
              {isUnread ? (
                <View className="w-2.5 h-2.5 rounded-full bg-green-500" />
              ) : (
                <Ionicons name="checkmark-done" size={18} color="#15803d" />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!isLoading && notifications.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-6 bg-white">
        <Ionicons name="notifications-off-outline" size={64} color="#d1d5db" />
        <Text className="text-lg font-bold text-gray-900 mt-4">
          No notifications yet
        </Text>
        <Text className="text-sm text-gray-500 text-center">
          {`We'll let you know when something happens.`}
        </Text>
      </View>
    );
  }

  return (
    <Screen className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="chevron-back" size={24} color="#15803d" />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-2 text-gray-900">
          Notifications
        </Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor="#15803d"
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="small" color="#15803d" className="mt-10" />
          ) : null
        }
      />
    </Screen>
  );
};

export default NotificationScreen;
