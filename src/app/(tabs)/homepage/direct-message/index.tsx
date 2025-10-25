import Screen from '@/src/layout/Screen';
import { rS } from '@/src/lib/responsivehandler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DirectMessage = () => {
  const router = useRouter();

  // Mock data for frequently chatted users
  const frequentlyChatted = [
    { id: 1, name: 'Lightbulb', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', status: 'online' },
    { id: 2, name: 'Chair', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', status: 'online' },
    { id: 3, name: 'Fish', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', status: 'online' },
    { id: 4, name: 'Open', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', status: 'online' },
    { id: 5, name: 'Crystal', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', status: 'offline' },
  ];

  // Mock data for all messages
  const allMessages = [
    {
      id: 1,
      name: 'Abdul Quay',
      lastMessage: 'olabodeoyindolapo@gmail.com',
      time: '08:43',
      unreadCount: 3,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isRead: false,
    },
    {
      id: 2,
      name: 'Chris Uil',
      lastMessage: '1,2 and 6 are remaining',
      time: '08:43',
      unreadCount: 3,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isRead: false,
    },
    {
      id: 3,
      name: 'Joe Mickey',
      lastMessage: 'Send me d link bro',
      time: '08:43',
      unreadCount: 0,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isRead: true,
    },
    {
      id: 4,
      name: 'Ojogbon',
      lastMessage: 'Bobo yiiiiiii 👍',
      time: '08:43',
      unreadCount: 0,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isRead: true,
    },
    {
      id: 5,
      name: 'General Focus',
      lastMessage: 'Update from your end',
      time: '09:43',
      unreadCount: 2,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isRead: false,
    },
    {
      id: 6,
      name: 'Sister Lee',
      lastMessage: 'Okay dear....How much?',
      time: 'Yesterday',
      unreadCount: 1,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isRead: false,
    },
    {
      id: 7,
      name: 'Abdul Q',
      lastMessage: '',
      time: 'Yesterday',
      unreadCount: 0,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isRead: true,
    },
  ];

  const handleOpenChatRoom =(message:any)=>{
    router.push({
      pathname: `/(tabs)/homepage/direct-message/chat-room`,
      params: { item: JSON.stringify(message) },
    });
  }

  return (
    <Screen className="bg-white" scroll={true}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[PoppinsSemiBold] text-primary"
            style={{ fontSize: rS(18) }}
          >
            Messages
          </Text>
        </View>
        <View />
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-4">
        <View className="bg-white border border-primary rounded-2xl px-4 py-3 flex-row items-center">
          <Ionicons name="search" size={20} color="#2E6939" />
          <TextInput
            placeholder="Search chat here....."
            placeholderTextColor="#9B9B9B"
            className="flex-1 ml-2"
            style={{ fontSize: rS(14) }}
          />
        </View>
      </View>

      {/* Frequently chatted Section */}
      <View className="mb-6">
        <Text
          className="px-4 mb-3 font-[PoppinsSemiBold] text-black"
          style={{ fontSize: rS(16) }}
        >
          Frequently chatted
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {frequentlyChatted.map((user) => (
            <View key={user.id} className="mr-4 items-center">
              <View className="w-16 h-16 rounded-2xl overflow-hidden relative">
                <View className="w-full h-full bg-gray-200 items-center justify-center">
                  <Text
                    className="text-gray-600 font-medium"
                    style={{ fontSize: rS(12) }}
                  >
                    {user.name}
                  </Text>
                </View>
                <View
                  className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                    user.status === "online" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* All Messages Section */}
      <View className="flex-1">
        <Text
          className="px-4 mb-3 font-[PoppinsSemiBold] text-black"
          style={{ fontSize: rS(16) }}
        >
          All Messages
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {allMessages.map((message) => (
            <TouchableOpacity
              key={message.id}
              className="flex-row items-center px-4 py-3 border-b border-gray-100"
              onPress={() => handleOpenChatRoom(message)}
            >
              {/* Profile Picture */}
              <View className="w-12 h-12 rounded-full mr-3 overflow-hidden">
                <View className="w-full h-full bg-gray-200 items-center justify-center">
                  <Text
                    className="text-gray-600 font-medium"
                    style={{ fontSize: rS(12) }}
                  >
                    {message.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Text>
                </View>
              </View>

              {/* Message Content */}
              <View className="flex-1">
                <Text
                  className="font-[PoppinsSemiBold] text-black mb-1"
                  style={{ fontSize: rS(14) }}
                >
                  {message.name}
                </Text>
                <Text className="text-primary" style={{ fontSize: rS(12) }}>
                  {message.lastMessage}
                </Text>
              </View>

              {/* Time and Status */}
              <View className="items-end">
                <Text
                  className="text-gray-500 mb-1"
                  style={{ fontSize: rS(12) }}
                >
                  {message.time}
                </Text>
                {message.unreadCount > 0 ? (
                  <View className="w-5 h-5 bg-primary rounded-full items-center justify-center">
                    <Text
                      className="text-white font-medium"
                      style={{ fontSize: rS(10) }}
                    >
                      {message.unreadCount}
                    </Text>
                  </View>
                ) : (
                  <Ionicons name="checkmark" size={16} color="#2E6939" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
};

export default DirectMessage;