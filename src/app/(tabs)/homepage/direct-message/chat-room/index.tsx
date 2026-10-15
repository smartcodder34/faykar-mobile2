// import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
// import MessagesList from "@/src/components/directMessageComp/MessagesList";
// import LoadingOverlay from "@/src/CustomComps/LoadingOverlay";
// import Screen from "@/src/layout/Screen";
// import { rS } from "@/src/lib/responsivehandler";
// import { getRoomId } from "@/src/utils/getRoomId";
// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import {
//   addDoc,
//   collection,
//   doc,
//   onSnapshot,
//   orderBy,
//   query,
//   setDoc,
//   Timestamp,
// } from "firebase/firestore";
// import React, { useEffect, useMemo, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { db } from "../../../../../../firebase-config";

// interface Message {
//   id: string;
//   text: string;
//   timestamp: string;
//   isSent: boolean;
// }

// const ChatRoom = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const getUserData = useGetUserApi();

//   const [messages, setMessages] = useState<Message[]>([]);

// const {
//   control,
//   handleSubmit,
//   reset,
//   formState: { errors, isValid },
// } = useForm({
//   mode: "onChange",
//   defaultValues: {
//     text: "",
//   },
// });
//   const currentUserId = getUserData.data?.data?.id;
//   const newData = useMemo(() => {
//     return params.item
//       ? JSON.parse(params.item as string)
//       : { name: "Abdul Quay" };
//   }, [params.item]);

// useEffect(() => {
//   createRoomIfNotExists();

//   let roomId = getRoomId(currentUserId, newData.seller?.id);
//   const docRef = doc(db, "rooms", roomId);
//   const messageRef = collection(docRef, "messages");
//   const q = query(messageRef, orderBy("createdAt", "asc"));
//   let unsub = onSnapshot(q, (snapshot) => {
//     let allMessages = snapshot.docs.map((doc) => {
//       return doc.data();
//     });
//     setMessages([...allMessages]);
//   });

//   return unsub;
// }, [currentUserId, newData.seller?.id]);

//   console.log("Messages:", messages);

// const createRoomIfNotExists = async () => {
//   // Logic to create chat room if it doesn't exist
//   let roomId = getRoomId(currentUserId, newData.seller?.id);
//   console.log("Room ID:", roomId);

//   await setDoc(doc(db, "rooms", roomId), {
//     roomId,
//     createdAt: Timestamp.fromDate(new Date()),
//   });
// };

// const handleMessages = async (data: any) => {
//   try {
//     let roomId = getRoomId(currentUserId, newData.seller?.id);
//     const docRef = doc(db, "rooms", roomId);
//     const messageRef = collection(docRef, "messages");
//     await addDoc(messageRef, {
//       text: data.text,
//       senderId: currentUserId,
//       receiverName: newData.seller?.full_name,
//       receiverId: newData.seller?.id,
//       timestamp: Timestamp.fromDate(new Date()),
//       createdAt: Timestamp.fromDate(new Date()),
//     });
//     // console.log("Message sent with ID: ", newDoc.id);
//     // Clear the input after successful send
//     reset();
//   } catch (error) {
//     console.error("Error sending message: ", error);
//     Alert.alert("Error", "Failed to send message.");
//   }
// };

//   return (
//     <Screen className="bg-white" scroll={true}>
//       <LoadingOverlay
//         isOpen={getUserData.isLoading} // Required: Controls visibility
//         message="Custom message" // Optional: Loading text
//         animationType="pulse" // Optional: "spin" | "pulse" | "bounce" | "fade"
//         backdropClassName="..." // Optional: Additional backdrop styling
//       />
//       {/* Header */}
//       <View className="">
//         <View className="  flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
//           <TouchableOpacity onPress={() => router.back()}>
//             <Ionicons name="chevron-back" size={24} color="#2E6939" />
//           </TouchableOpacity>

//           <View className="flex-1 items-center">
//             <Text
//               className="font-[PoppinsSemiBold] text-primary"
//               style={{ fontSize: rS(18) }}
//             >
//               {newData.seller?.full_name}
//             </Text>
//             <Text className="text-gray-500 text-sm">Last seen 2hrs ago</Text>
//           </View>

//           <TouchableOpacity>
//             <Ionicons name="ellipsis-vertical" size={24} color="#2E6939" />
//           </TouchableOpacity>
//         </View>
//       </View>

// //       {/* Chat Messages */}

//        <View className=" flex-1 justify-between bg-neutral-100 overflow-visible">
//         <View className=" flex-1">
//           <MessagesList messages={messages} currentUserId={currentUserId} />
//         </View>
//         <View className="p-4 " style={{ marginBottom: 20 }}>
//           <View className=" flex-row justify-between items-center bg-white rounded-2xl px-4 py-2">
//             <Controller
//               control={control}
//               name="text"
//               rules={{
//                 required: "text is required",
//               }}
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <TextInput
//                   placeholder="Type message"
//                   className=" flex-1 h-10"
//                   onChangeText={onChange}
//                   onBlur={onBlur}
//                   value={value}
//                   // error={errors.text?.message}
//                 />
//               )}
//             />
//             <TouchableOpacity onPress={handleSubmit(handleMessages)}>
//               <Ionicons name="send" size={20} color="#2E6939" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Screen>
//   );
// };

// export default ChatRoom;

import { useGetUserApi } from "@/src/api-services/authApi/authQuery";
import MessagesList from "@/src/components/directMessageComp/MessagesList";
import LoadingOverlay from "@/src/CustomComps/LoadingOverlay";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import useGetAllMessage from "@/src/store/chatStore";
import { getRoomId } from "@/src/utils/getRoomId";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { db } from "../../../../../../firebase-config";

interface Message {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  receiverName?: string;
  createdAt: Timestamp;
  readStatus?: boolean;
}

interface FormData {
  text: string;
}

const ChatRoom = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const getUserData = useGetUserApi();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isRoomReady, setIsRoomReady] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });

  const currentUserId = getUserData.data?.data?.id;

  const chatMessages = useGetAllMessage((state: any) => state.chatMessages) as any;

  const newData = useMemo(() => {
    return params.item
      ? JSON.parse(params.item as string)
      : { seller: { id: "", full_name: "Unknown" } };
  }, [params.item]);

  const currentUserName =
    chatMessages?.currentUserName ||
    getUserData.data?.data?.full_name ||
    "Unknown";

  const otherUserId =
    chatMessages?.otherUserId ||
    chatMessages?.seller?.id ||
    newData.seller?.id;

  const otherName =
    chatMessages?.seller?.full_name ||
    chatMessages?.name ||
    newData.seller?.full_name ||
    "Unknown User";

  // Memoize roomId to avoid recalculating
  const roomId = useMemo(() => {
    if (!currentUserId || !otherUserId) return null;
    return getRoomId(currentUserId, otherUserId);
  }, [currentUserId, otherUserId]);


  // Setup chat room and listener
  useEffect(() => {
    if (!roomId || !currentUserId || !otherUserId) {
      console.warn("Missing required data for chat room");
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const setupChatRoom = async () => {
      try {
        // Create room if it doesn't exist (never overwrite existing meta)
        const roomDocRef = doc(db, "rooms", roomId);
        const snapshot = await getDoc(roomDocRef);
        if (!snapshot.exists()) {
          await setDoc(roomDocRef, {
            roomId,
            receiverName: otherName,
            createdAt: Timestamp.fromDate(new Date()),
            participants: [currentUserId, otherUserId],
            participantNames: {
              [currentUserId]: currentUserName,
              [otherUserId]: otherName,
            },
            lastUpdated: Timestamp.fromDate(new Date()),
          });
        }

        setIsRoomReady(true);

        // Set up real-time listener for messages
        const messagesRef = collection(roomDocRef, "messages");
        const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

        unsubscribe = onSnapshot(
          messagesQuery,
          (snapshot) => {
            const allMessages = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Message[];
            setMessages(allMessages);
          },
          (error) => {
            console.error("Error listening to messages:", error);
            Alert.alert("Error", "Failed to load messages. Please try again.");
          },
        );
      } catch (error) {
        console.error("Error setting up chat room:", error);
        Alert.alert("Error", "Failed to initialize chat room.");
      }
    };

    setupChatRoom();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [roomId, currentUserId, otherUserId, otherName, currentUserName]);

  // Mark the other user's messages as read + zero this user's unread counter
  const markRoomRead = useCallback(async () => {
    if (!roomId || !currentUserId) return;

    try {
      const unreadMessages = messages.filter(
        (m) => m.senderId !== currentUserId && !m.readStatus
      );

      const docRef = doc(db, "rooms", roomId);
      const batch = writeBatch(db);

      unreadMessages.forEach((m) => {
        batch.update(doc(db, "rooms", roomId, "messages", m.id), {
          readStatus: true,
        });
      });

      if (unreadMessages.length > 0) {
        batch.update(docRef, {
          [`unreadCounts.${currentUserId}`]: 0,
          [`lastReadAt.${currentUserId}`]: Timestamp.now(),
        });
      }

      await batch.commit();
    } catch (error) {
      console.error("Error marking room as read: ", error);
    }
  }, [messages, roomId, currentUserId]);

  // Mark incoming messages as read once they load
  useEffect(() => {
    markRoomRead();
  }, [messages, markRoomRead]);

  // Handle sending messages
  const handleMessages = useCallback(
    async (data: FormData) => {
      if (!roomId || !currentUserId || !otherUserId) {
        Alert.alert("Error", "Missing required information.");
        return;
      }

      const trimmedText = data.text.trim();
      if (!trimmedText) {
        return; // Don't send empty messages
      }

      if (!isRoomReady) {
        Alert.alert("Please Wait", "Chat room is still loading...");
        return;
      }

      setIsSending(true);

      try {
        const roomDocRef = doc(db, "rooms", roomId);
        const messagesRef = collection(roomDocRef, "messages");

        const messageData = {
          text: trimmedText,
          senderId: currentUserId,
          receiverName: otherName,
          receiverId: otherUserId,
          createdAt: Timestamp.fromDate(new Date()),
          readStatus: false,
        };

        await addDoc(messagesRef, messageData);

        // Update room's last message info + participantNames
        await setDoc(
          roomDocRef,
          {
            lastMessageAt: Timestamp.fromDate(new Date()),
            lastMessage: trimmedText,
            lastSenderId: currentUserId,
            participants: [currentUserId, otherUserId],
            receiverName: otherName,
            participantNames: {
              [currentUserId]: currentUserName,
              [otherUserId]: otherName,
            },
          },
          { merge: true },
        );

        // Increment the other user's unread count
        await updateDoc(roomDocRef, {
          [`unreadCounts.${otherUserId}`]: increment(1),
        });

        reset();
      } catch (error) {
        console.error("Error sending message:", error);
        Alert.alert("Error", "Failed to send message. Please try again.");
      } finally {
        setIsSending(false);
      }
    },
    [roomId, currentUserId, otherUserId, otherName, currentUserName, isRoomReady, reset],
  );

  return (
    <Screen className="bg-white" scroll={false} keyboardAware={false}>
      <LoadingOverlay
        isOpen={getUserData.isLoading || !isRoomReady}
        message={
          getUserData.isLoading ? "Loading user data..." : "Setting up chat..."
        }
        animationType="pulse"
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text
            className="font-[PoppinsSemiBold] text-primary"
            style={{ fontSize: rS(18) }}
          >
            {otherName || "Unknown User"}
          </Text>
          <Text className="text-gray-500 text-sm">Last seen 2hrs ago</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#2E6939" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessagesList messages={messages} currentUserId={currentUserId} />
        </View>

        {/* Input Area */}
        <KeyboardStickyView offset={{ opened: 0, closed: 0 }}>
          <View className="p-4" style={{ marginBottom: 20 }}>
            <View className="flex-row justify-between items-center bg-white rounded-2xl px-4 py-2">
              <Controller
                control={control}
                name="text"
                rules={{
                  required: "Message is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Message cannot be empty",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Type message"
                    className="flex-1 h-10"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    editable={!isSending && isRoomReady}
                    multiline
                  />
                )}
              />
              <TouchableOpacity
                onPress={handleSubmit(handleMessages)}
                disabled={isSending || !isRoomReady}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={isSending || !isRoomReady ? "#cccccc" : "#2E6939"}
                />
              </TouchableOpacity>
            </View>
            {errors.text && (
              <Text className="text-red-500 text-xs mt-1 ml-4">
                {errors.text.message}
              </Text>
            )}
          </View>
        </KeyboardStickyView>
      </View>
    </Screen>
  );
};

export default ChatRoom;
