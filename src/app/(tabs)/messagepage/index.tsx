



import { roomsRef } from "@/firebase-config";
import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import useGetAllMessage from "@/src/store/chatStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface RoomData {
  id: string;
  roomId: string;
  participants: string[];
  participantNames?: { [userId: string]: string };
  lastMessage?: string;
  receiverName: string;
  lastMessageAt?: Timestamp;
  lastSenderId?: string;
  createdAt: Timestamp;
  unreadCounts?: { [userId: string]: number };
  lastReadAt?: { [userId: string]: Timestamp };
}

interface MessagePreview {
  id: string;
  roomId: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isRead: boolean;
  otherUserId: string;
  lastSenderId?: string;
  lastMessageAt?: Timestamp;
}

const MessagePage = () => {
  const router = useRouter();
  const getUserData = useGetUserApi();
  const currentUserId = getUserData.data?.data?.id;

  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const setChatMessages = useGetAllMessage((state: any) => state.setChatMessages);

  // Fetch rooms where current user is a participant
  useEffect(() => {
    if (!currentUserId) {
      console.warn("No current user ID available");
      setIsLoading(false);
      return;
    }

    console.log("Setting up rooms listener for user:", currentUserId);

    const q = query(
      roomsRef,
      where("participants", "array-contains", currentUserId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const allRooms = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a: any, b: any) => {
            // Sort by last message time (most recent first)
            const aTime = a.lastMessageAt?.toMillis() || 0;
            const bTime = b.lastMessageAt?.toMillis() || 0;
            return bTime - aTime;
          }) as RoomData[];

            setRooms(allRooms);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching rooms:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUserId]);

  // Transform rooms into message previews
  const messagesPreviews = useMemo<MessagePreview[]>(() => {
    if (!currentUserId) return [];

    return rooms
      .filter((room) => !!room.lastMessage)
      .map((room) => {
        // Get the other user's ID
        const otherUserId =
          room.participants?.find((id) => id !== currentUserId) || "";

        // Format time
        const formatTime = (timestamp?: Timestamp) => {
          if (!timestamp) return "";

          const date = timestamp.toDate();
          const now = new Date();
          const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

          if (diffInHours < 24) {
            // Show time for today
            return date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          } else if (diffInHours < 48) {
            return "Yesterday";
          } else if (diffInHours < 168) {
            // Less than a week
            return date.toLocaleDateString("en-US", { weekday: "short" });
          } else {
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }
        };

        // Get the other person's name from participantNames or fallback to receiverName
        const otherPersonName =
          room.participantNames?.[otherUserId] ||
          room.receiverName ||
          "Unknown";

        const lastMessageAtMillis = room.lastMessageAt?.toMillis() || 0;
        const lastReadAtMillis =
          room.lastReadAt?.[currentUserId]?.toMillis() || 0;
        const isUnread =
          room.lastSenderId !== currentUserId &&
          lastMessageAtMillis > lastReadAtMillis;

        return {
          id: room.id,
          roomId: room.roomId,
          name: otherPersonName,
          lastMessage: room.lastMessage || "No messages yet",
          time: formatTime(room.lastMessageAt),
          unreadCount: room.unreadCounts?.[currentUserId] || 0,
          isRead: !isUnread,
          otherUserId,
          lastSenderId: room.lastSenderId,
          lastMessageAt: room.lastMessageAt,
        };
      });
  }, [rooms, currentUserId]);

  // Filter messages based on search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messagesPreviews;

    const query = searchQuery.toLowerCase();
    return messagesPreviews.filter(
      (msg) =>
        msg.name.toLowerCase().includes(query) ||
        msg.lastMessage.toLowerCase().includes(query)
    );
  }, [messagesPreviews, searchQuery]);

  // Get frequently chatted (top 5 most recent conversations)
  const frequentlyChattedRooms = useMemo(() => {
    return messagesPreviews.slice(0, 5);
  }, [messagesPreviews]);

  const handleOpenChatRoom = (message: MessagePreview) => {
    // Get current user's name
    const currentUserName =
      getUserData?.data?.data?.full_name || "Unknown";

    // Pass the message with current user info
    setChatMessages({
      ...message,
      currentUserName,
      currentUserId,
      seller: {
        id: message.otherUserId,
        full_name: message.name,
      },
    });

    router.push({
      pathname: `/(tabs)/homepage/direct-message/chat-room`,
      params: { item: JSON.stringify({ seller: { id: message.otherUserId, full_name: message.name }, roomId: message.roomId }) },
    });
  };

  return (
    <Screen className="bg-white" scroll={true} keyboardAware={false}>
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
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#9B9B9B" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Loading State */}
      {isLoading && (
        <View className="flex-1 items-center justify-center py-10">
          <ActivityIndicator size="large" color="#2E6939" />
          <Text className="text-gray-500 mt-2">Loading conversations...</Text>
        </View>
      )}

      {/* Empty State */}
      {!isLoading && messagesPreviews.length === 0 && (
        <View className="flex-1 items-center justify-center py-10">
          <Ionicons name="chatbubbles-outline" size={64} color="#CCCCCC" />
          <Text className="text-gray-500 mt-4" style={{ fontSize: rS(16) }}>
            No conversations yet
          </Text>
          <Text
            className="text-gray-400 mt-2 text-center px-8"
            style={{ fontSize: rS(14) }}
          >
            Start chatting with sellers to see your messages here
          </Text>
        </View>
      )}

      {/* Content - Only show if not loading and has messages */}
      {!isLoading && messagesPreviews.length > 0 && (
        <>
          {/* Frequently chatted Section */}
          {frequentlyChattedRooms.length > 0 && (
            <View className="mb-6">
              <Text
                className="px-4 mb-3 font-[PoppinsSemiBold] text-black"
                style={{ fontSize: rS(16) }}
              >
                Recent Chats
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              >
                {frequentlyChattedRooms.map((room) => (
                  <TouchableOpacity
                    key={room.id}
                    onPress={() => handleOpenChatRoom(room)}
                    className="mr-4 items-center"
                  >
                    <View className="w-16 h-16 rounded-2xl overflow-hidden relative bg-gray-200 items-center justify-center">
                      <Text
                        className="text-primary font-[PoppinsSemiBold]"
                        style={{ fontSize: rS(18) }}
                      >
                        {room.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </Text>
                      {room.unreadCount > 0 && (
                        <View className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
                      )}
                    </View>
                    <Text
                      className="text-gray-700 mt-1 text-center"
                      style={{ fontSize: rS(10), maxWidth: 60 }}
                      numberOfLines={1}
                    >
                      {room.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* All Messages Section */}
          <View className="flex-1">
            <Text
              className="px-4 mb-3 font-[PoppinsSemiBold] text-black"
              style={{ fontSize: rS(16) }}
            >
              All Messages ({filteredMessages.length})
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredMessages.length === 0 ? (
                <View className="items-center justify-center py-10">
                  <Text className="text-gray-500">
                    No matching conversations
                  </Text>
                </View>
              ) : (
                filteredMessages.map((message) => (
                  <TouchableOpacity
                    key={message.id}
                    className="flex-row items-center px-4 py-3 border-b border-gray-100"
                    onPress={() => handleOpenChatRoom(message)}
                  >
                    {/* Profile Picture */}
                    <View className="w-12 h-12 rounded-full mr-3 overflow-hidden bg-gray-200 items-center justify-center">
                      <Text
                        className="text-primary font-[PoppinsSemiBold]"
                        style={{ fontSize: rS(16) }}
                      >
                        {message.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </Text>
                    </View>

                    {/* Message Content */}
                    <View className="flex-1">
                      <Text
                        className="font-[PoppinsSemiBold] text-black mb-1"
                        style={{ fontSize: rS(14) }}
                      >
                        {message.name}
                      </Text>
                      <Text
                        className={`${
                          message.isRead
                            ? "text-gray-400"
                            : "text-primary font-[PoppinsSemiBold]"
                        }`}
                        style={{ fontSize: rS(12) }}
                        numberOfLines={1}
                      >
                        {message.isRead ? "You: " : ""}
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
                            className="text-white font-[PoppinsSemiBold]"
                            style={{ fontSize: rS(10) }}
                          >
                            {message.unreadCount}
                          </Text>
                        </View>
                      ) : message.isRead ? (
                        <Ionicons
                          name="checkmark-done"
                          size={16}
                          color="#2E6939"
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </>
      )}
    </Screen>
  );
};

export default MessagePage;