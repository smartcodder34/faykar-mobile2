import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FrequentChat = {
  id: string;
  image: string;
  statusColor: string;
};

type ConversationItem = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string; // e.g., "08:43" or "Yesterday"
  unreadCount?: number; // if present, show badge
  seen?: boolean; // if true and no unread, show tick
};

const frequentChats: FrequentChat[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
    statusColor: "#2E6939",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces",
    statusColor: "#E53935",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    statusColor: "#2E6939",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=120&h=120&fit=crop&crop=faces",
    statusColor: "#2E6939",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&crop=faces",
    statusColor: "#2E6939",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=120&h=120&fit=crop&crop=faces",
    statusColor: "#2E6939",
  },
];

const conversations: ConversationItem[] = [
  {
    id: "c1",
    name: "Abdul Quay",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=faces",
    lastMessage: "olabodeoyindolapo@gmail.com",
    time: "08:43",
    unreadCount: 3,
  },
  {
    id: "c2",
    name: "Chris Uil",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop&crop=faces",
    lastMessage: "1,2 and 6 are remaining",
    time: "08:43",
    unreadCount: 3,
  },
  {
    id: "c3",
    name: "Joe Mickey",
    avatar:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=80&h=80&fit=crop&crop=faces",
    lastMessage: "Send me d link bro",
    time: "08:43",
    seen: true,
  },
  {
    id: "c4",
    name: "Ojogbon",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=faces",
    lastMessage: "Bobo yiiiii 👌",
    time: "08:43",
  },
  {
    id: "c5",
    name: "General Focus",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=faces",
    lastMessage: "Update from your end",
    time: "09:43",
    unreadCount: 2,
  },
  {
    id: "c6",
    name: "Sister Lee",
    avatar:
      "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=80&h=80&fit=crop&crop=faces",
    lastMessage: "Okay dear...How much?",
    time: "Yesterday",
    unreadCount: 1,
  },
  {
    id: "c7",
    name: "Abdul Q",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=faces",
    lastMessage: "",
    time: "Yesterday",
  },
];

const DirectMessage = () => {
  const router = useRouter();

  const renderConversation = ({ item }: { item: ConversationItem }) => {
    return (
      <TouchableOpacity
        key={item.id}
        className="flex-row items-center px-4 py-3"
        activeOpacity={0.8}
      >
        <View className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-100">
          <Image
            source={{ uri: item.avatar }}
            style={{ height: "100%", width: "100%" }}
            contentFit="cover"
          />
        </View>

        <View className="flex-1">
          <Text className="text-black font-[InterSemiBold]" style={{ fontSize: rS(14) }}>
            {item.name}
          </Text>
          {item.lastMessage ? (
            <Text className="text-gray-500" style={{ fontSize: rS(12) }}>
              {item.lastMessage}
            </Text>
          ) : null}
        </View>

        <View className="items-end">
          <Text className="text-gray-400 mb-1" style={{ fontSize: rS(10) }}>
            {item.time}
          </Text>
          {typeof item.unreadCount === "number" && item.unreadCount > 0 ? (
            <View className="min-w-[20px] h-5 px-1 bg-primary rounded-full items-center justify-center">
              <Text className="text-white" style={{ fontSize: rS(10) }}>
                {item.unreadCount}
              </Text>
            </View>
          ) : item.seen ? (
            <Ionicons name="checkmark-done" size={18} color="#2E6939" />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen className="bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="pr-2 py-1">
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <Text className="text-primary font-[InterSemiBold]" style={{ fontSize: rS(18) }}>
          Messages
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-2">
        <View className="flex-row items-center bg-white border border-gray-200 rounded-full px-3 py-2">
          <Ionicons name="search" size={18} color="#7A7A7A" />
          <TextInput
            placeholder="Search chat here....."
            placeholderTextColor="#9AA0A6"
            className="flex-1 ml-2 text-black"
            style={{ fontSize: rS(12), paddingVertical: 0 }}
          />
        </View>
      </View>

      {/* Frequently chatted */}
      <View className="px-4 mt-2">
        <Text className="text-black font-[InterSemiBold] mb-3" style={{ fontSize: rS(12) }}>
          Frequently chatted
        </Text>
      </View>
      <FlatList
        data={frequentChats}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 8 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <View className="w-16 h-16 rounded-xl overflow-hidden relative">
            <Image
              source={{ uri: item.image }}
              style={{ height: "100%", width: "100%" }}
              contentFit="cover"
            />
            <View
              className="w-3.5 h-3.5 rounded-full absolute bottom-1 right-1 border-2 border-white"
              style={{ backgroundColor: item.statusColor }}
            />
          </View>
        )}
      />

      {/* All Messages */}
      <View className="px-4 mt-2">
        <Text className="text-black font-[InterSemiBold]" style={{ fontSize: rS(12) }}>
          All Messages
        </Text>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        ItemSeparatorComponent={() => (
          <View className="h-[1px] bg-gray-100 mx-4" />
        )}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default DirectMessage;