// import { roomsRef } from "@/firebase-config";
// import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
// import Screen from "@/src/layout/Screen";
// import { rS } from "@/src/lib/responsivehandler";
// import useGetAllMessage from "@/src/store/chatStore";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { onSnapshot } from "firebase/firestore";
// import React from "react";
// import {
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const MessagePage = () => {
//   const router = useRouter();
//   const getUserData = useGetUserApi();
//   const currentUserId = getUserData.data?.data?.id;
//   const chatMessages = useGetAllMessage().chatMessages;

//   const [senderId, setSenderId] = React.useState("");

//   console.log("chatMessages from store:", chatMessages);


//   // Mock data for frequently chatted users
//   const frequentlyChatted = [
//     {
//       id: 1,
//       name: "Lightbulb",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
//       status: "online",
//     },
//     {
//       id: 2,
//       name: "Chair",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
//       status: "online",
//     },
//     {
//       id: 3,
//       name: "Fish",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
//       status: "online",
//     },
//     {
//       id: 4,
//       name: "Open",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
//       status: "online",
//     },
//     {
//       id: 5,
//       name: "Crystal",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
//       status: "offline",
//     },
//   ];

//   // Mock data for all messages
//   const allMessages = [
//     {
//       id: 1,
//       name: "Abdul Quay",
//       lastMessage: "olabodeoyindolapo@gmail.com",
//       time: "08:43",
//       unreadCount: 3,
//       profileImage:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
//       isRead: false,
//     },
//     {
//       id: 2,
//       name: "Chris Uil",
//       lastMessage: "1,2 and 6 are remaining",
//       time: "08:43",
//       unreadCount: 3,
//       profileImage:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
//       isRead: false,
//     },
//     {
//       id: 3,
//       name: "Joe Mickey",
//       lastMessage: "Send me d link bro",
//       time: "08:43",
//       unreadCount: 0,
//       profileImage:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
//       isRead: true,
//     },
//     {
//       id: 4,
//       name: "Ojogbon",
//       lastMessage: "Bobo yiiiiiii 👍",
//       time: "08:43",
//       unreadCount: 0,
//       profileImage:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
//       isRead: true,
//     },
//     {
//       id: 5,
//       name: "General Focus",
//       lastMessage: "Update from your end",
//       time: "09:43",
//       unreadCount: 2,
//       profileImage:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
//       isRead: false,
//     },
//     {
//       id: 6,
//       name: "Sister Lee",
//       lastMessage: "Okay dear....How much?",
//       time: "Yesterday",
//       unreadCount: 1,
//       profileImage:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
//       isRead: false,
//     },
//     {
//       id: 7,
//       name: "Abdul Q",
//       lastMessage: "",
//       time: "Yesterday",
//       unreadCount: 0,
//       profileImage:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
//       isRead: true,
//     },
//   ];



//   React.useEffect(() => {
//     const unsubscribe = onSnapshot(roomsRef, (snapshot) => {
//       const allRooms = snapshot.docs.map((doc) => {
//         return {
//           id: doc.id,
//           ...doc.data(),
//         };
//       });
//       console.log("All rooms33:", allRooms);
//       // setRooms(allRooms); // Update your state
//     });

//     return () => unsubscribe(); // Cleanup listener
//   }, []);

//   const handleOpenChatRoom = (message: any) => {
    
// setSenderId(message.senderId);
//     // router.push({
//     //   pathname: `/(tabs)/homepage/direct-message/chat-room`,
//     //   params: { item: JSON.stringify(message) },
//     // });
//   };

//   return (
//     <Screen className="bg-white" scroll={true}>
//       {/* Header */}
//       <View className="flex-row items-center justify-between px-4 py-3 bg-white">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="chevron-back" size={24} color="#2E6939" />
//         </TouchableOpacity>
//         <View>
//           <Text
//             className="font-[PoppinsSemiBold] text-primary"
//             style={{ fontSize: rS(18) }}
//           >
//             Messages
//           </Text>
//         </View>
//         <View />
//       </View>

//       {/* Search Bar */}
//       <View className="px-4 mb-4">
//         <View className="bg-white border border-primary rounded-2xl px-4 py-3 flex-row items-center">
//           <Ionicons name="search" size={20} color="#2E6939" />
//           <TextInput
//             placeholder="Search chat here....."
//             placeholderTextColor="#9B9B9B"
//             className="flex-1 ml-2"
//             style={{ fontSize: rS(14) }}
//           />
//         </View>
//       </View>

//       {/* Frequently chatted Section */}
//       <View className="mb-6">
//         <Text
//           className="px-4 mb-3 font-[PoppinsSemiBold] text-black"
//           style={{ fontSize: rS(16) }}
//         >
//           Frequently chatted
//         </Text>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 16 }}
//         >
//           {frequentlyChatted.map((user) => (
//             <View key={user.id} className="mr-4 items-center">
//               <View className="w-16 h-16 rounded-2xl overflow-hidden relative">
//                 <View className="w-full h-full bg-gray-200 items-center justify-center">
//                   <Text
//                     className="text-gray-600 font-medium"
//                     style={{ fontSize: rS(12) }}
//                   >
//                     {user.name}
//                   </Text>
//                 </View>
//                 <View
//                   className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
//                     user.status === "online" ? "bg-green-500" : "bg-red-500"
//                   }`}
//                 />
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       </View>

//       {/* All Messages Section */}
//       <View className="flex-1">
//         <Text
//           className="px-4 mb-3 font-[PoppinsSemiBold] text-black"
//           style={{ fontSize: rS(16) }}
//         >
//           All Messages
//         </Text>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {allMessages.map((message) => (
//             <TouchableOpacity
//               key={message.id}
//               className="flex-row items-center px-4 py-3 border-b border-gray-100"
//               onPress={() => handleOpenChatRoom(message)}
//             >
//               {/* Profile Picture */}
//               <View className="w-12 h-12 rounded-full mr-3 overflow-hidden">
//                 <View className="w-full h-full bg-gray-200 items-center justify-center">
//                   <Text
//                     className="text-gray-600 font-medium"
//                     style={{ fontSize: rS(12) }}
//                   >
//                     {message.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </Text>
//                 </View>
//               </View>

//               {/* Message Content */}
//               <View className="flex-1">
//                 <Text
//                   className="font-[PoppinsSemiBold] text-black mb-1"
//                   style={{ fontSize: rS(14) }}
//                 >
//                   {message.name}
//                 </Text>
//                 <Text className="text-primary" style={{ fontSize: rS(12) }}>
//                   {message.lastMessage}
//                 </Text>
//               </View>

//               {/* Time and Status */}
//               <View className="items-end">
//                 <Text
//                   className="text-gray-500 mb-1"
//                   style={{ fontSize: rS(12) }}
//                 >
//                   {message.time}
//                 </Text>
//                 {message.unreadCount > 0 ? (
//                   <View className="w-5 h-5 bg-primary rounded-full items-center justify-center">
//                     <Text
//                       className="text-white font-medium"
//                       style={{ fontSize: rS(10) }}
//                     >
//                       {message.unreadCount}
//                     </Text>
//                   </View>
//                 ) : (
//                   <Ionicons name="checkmark" size={16} color="#2E6939" />
//                 )}
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>
//     </Screen>
//   );
// };

// export default MessagePage;



import { roomsRef } from "@/firebase-config";
import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  onSnapshot,
  Timestamp
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
  lastMessage?: string;
  receiverName: string;
  lastMessageAt?: Timestamp;
  lastSenderId?: string;
  createdAt: Timestamp;
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
  lastMessageAt?: Timestamp;
}

const MessagePage = () => {
  const router = useRouter();
  const getUserData = useGetUserApi();
  const currentUserId = getUserData.data?.data?.id;

  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all rooms for current user
  useEffect(() => {
    if (!currentUserId) {
      console.warn("No current user ID available");
      setIsLoading(false);
      return;
    }

    console.log("Setting up rooms listener for user:", currentUserId);

    const unsubscribe = onSnapshot(
      roomsRef,
      (snapshot) => {
        const allRooms = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((room: any) => {
            // Only show rooms where current user is a participant
            return room.participants?.includes(currentUserId);
          })
          .sort((a: any, b: any) => {
            // Sort by last message time (most recent first)
            const aTime = a.lastMessageAt?.toMillis() || 0;
            const bTime = b.lastMessageAt?.toMillis() || 0;
            return bTime - aTime;
          }) as RoomData[];

        console.log("Filtered rooms for current user:", allRooms);
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

    return rooms.map((room) => {
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

      return {
        id: room.id,
        roomId: room.roomId,
        name: room.receiverName, // You'll want to fetch actual user names
        lastMessage: room.lastMessage || "No messages yet",
        time: formatTime(room.lastMessageAt),
        unreadCount: 0, // TODO: Implement unread count logic
        isRead: room.lastSenderId === currentUserId, // If you sent the last message
        otherUserId,
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
    // Create a seller object from the message data
    const chatData = {
      seller: {
        id: message.otherUserId,
        full_name: message.name,
      },
      roomId: message.roomId,
    };

    router.push({
      pathname: `/(tabs)/homepage/direct-message/chat-room`,
      params: { item: JSON.stringify(chatData) },
    });
  };

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