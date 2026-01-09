// import { useCommentOnProduct } from "@/src/api-services/productsApi/productMutation";
// import { getInitials } from "@/src/utils/getInitials";
// // import { Send } from "lucide-react-native";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// interface CommentSectionProps {
//   getProductCommentLists: any;
//   getUserProduct: any;
// }

// const CommentSection = ({
//   getProductCommentLists,
//   getUserProduct,
// }: CommentSectionProps) => {
//   const [newComment, setNewComment] = useState("");
//   const commentOnProduct = useCommentOnProduct();

//   const getAvatarColor = (name: string) => {
//     const colors = [
//       "#3B82F6",
//       "#10B981",
//       "#8B5CF6",
//       "#EC4899",
//       "#6366F1",
//       "#F97316",
//     ];
//     const index = name.length % colors.length;
//     return colors[index];
//   };

//   const handleSubmitComment = () => {
//     if (!newComment.trim() || !getUserProduct?.id) return;

//     const requestData = {
//       product_id: getUserProduct.id,
//       comment: newComment,
//     };
//     commentOnProduct.mutate(requestData);
//     setNewComment("");
//   };

//   const comments = getProductCommentLists?.data?.data?.comments || [];

//   const renderComment = ({ item }: { item: any }) => (
//     <View style={styles.commentItem}>
//       <View style={styles.commentContent}>
//         <View
//           style={[
//             styles.avatar,
//             { backgroundColor: getAvatarColor(item.commenter.full_name) },
//           ]}
//         >
//           <Text style={styles.avatarText}>
//             {getInitials(item.commenter.full_name)}
//           </Text>
//         </View>

//         <View style={styles.contentWrapper}>
//           <View style={styles.header}>
//             <Text style={styles.username} numberOfLines={1}>
//               {item.commenter.full_name}
//             </Text>
//             <Text style={styles.timestamp}>{item.created_at}</Text>
//           </View>
//           <Text style={styles.commentText}>{item.comment}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={comments}
//         renderItem={renderComment}
//         keyExtractor={(item) => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No comments yet</Text>
//           </View>
//         }
//       />

//       <View style={styles.inputContainer}>
//         <View style={styles.inputWrapper}>
//           <View
//             style={[
//               styles.avatarSmall,
//               { backgroundColor: getAvatarColor("User") },
//             ]}
//           >
//             <Text style={styles.avatarTextSmall}>{getInitials("User")}</Text>
//           </View>

//           <View style={styles.inputGroup}>
//             <TextInput
//               value={newComment}
//               onChangeText={setNewComment}
//               placeholder="Write a comment..."
//               placeholderTextColor="#9CA3AF"
//               style={styles.textInput}
//               multiline
//               maxLength={500}
//             />
//             <TouchableOpacity
//               onPress={handleSubmitComment}
//               disabled={!newComment.trim() || commentOnProduct.isPending}
//               style={[
//                 styles.sendButton,
//                 (!newComment.trim() || commentOnProduct.isPending) &&
//                   styles.sendButtonDisabled,
//               ]}
//               activeOpacity={0.7}
//             >
//               {commentOnProduct.isPending ? (
//                 <ActivityIndicator color="#fff" size="small" />
//               ) : (
//                 <>
//                   {/* <Send color="#fff" size={16} /> */}
//                   <Text style={styles.sendButtonText}>Send</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   listContent: {
//     paddingBottom: 10,
//     flexGrow: 1,
//   },
//   commentItem: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#F3F4F6",
//   },
//   commentContent: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   avatar: {
//     height: 48,
//     width: 48,
//     borderRadius: 24,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   avatarText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   contentWrapper: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 4,
//   },
//   username: {
//     fontWeight: "600",
//     color: "#111827",
//     fontSize: 14,
//     flex: 1,
//     marginRight: 8,
//   },
//   timestamp: {
//     fontSize: 11,
//     color: "#9CA3AF",
//     fontWeight: "500",
//   },
//   commentText: {
//     fontSize: 14,
//     color: "#4B5563",
//     lineHeight: 20,
//   },
//   emptyContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 40,
//   },
//   emptyText: {
//     color: "#9CA3AF",
//     fontSize: 14,
//   },
//   inputContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     borderTopWidth: 1,
//     borderTopColor: "#F3F4F6",
//     backgroundColor: "#F9FAFB",
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//   },
//   avatarSmall: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },
//   avatarTextSmall: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 12,
//   },
//   inputGroup: {
//     flex: 1,
//     flexDirection: "row",
//     gap: 8,
//   },
//   textInput: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     borderRadius: 20,
//     fontSize: 14,
//     maxHeight: 100,
//   },
//   sendButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: "#3B82F6",
//     borderRadius: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     justifyContent: "center",
//     minWidth: 80,
//   },
//   sendButtonDisabled: {
//     backgroundColor: "#D1D5DB",
//   },
//   sendButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "500",
//   },
// });

// export default CommentSection;


import { useCommentOnProduct } from "@/src/api-services/productsApi/productMutation";
import { getInitials } from "@/src/utils/getInitials";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CommentSectionProps {
  getProductCommentLists: any;
  getUserProduct: any;
  ListHeaderComponent?: React.ReactElement;
}

const CommentSection = ({
  getProductCommentLists,
  getUserProduct,
  ListHeaderComponent,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const commentOnProduct = useCommentOnProduct();
  const comments = getProductCommentLists?.data?.data?.comments || [];

  const handleSubmitComment = () => {
    if (!newComment.trim() || !getUserProduct?.id) return;
    commentOnProduct.mutate(
      { product_id: getUserProduct.id, comment: newComment },
      {
        onSuccess: () => {
          setNewComment("");
          getProductCommentLists.refetch();
        },
      }
    );
  };

  const renderComment = ({ item }: any) => (
    <View className="flex-row p-4 border-b border-gray-50">
      <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
        <Text className="text-green-700 font-bold text-xs">
          {getInitials(item.commenter.full_name)}
        </Text>
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="font-bold text-gray-900 text-sm">
            {item.commenter.full_name}
          </Text>
          <Text className="text-[10px] text-gray-400">{item.created_at}</Text>
        </View>
        <Text className="text-gray-700 text-[13px] leading-5">
          {item.comment}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          !getProductCommentLists.isLoading && (
            <View className="items-center py-10">
              <Text className="text-gray-400">
                No comments yet. Be the first!
              </Text>
            </View>
          )
        }
      />

      {/* Input Area - Pinned to bottom */}
      <View className="mb-safe-offset-10  p-4  border-t border-gray-100">
        <View className="flex-row items-center bg-white rounded-full px-4 py-1 border border-gray-200">
          <TextInput
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Write a comment..."
            className="flex-1 h-10 text-sm text-gray-800"
            multiline={false} // multiline can sometimes hide the text in rounded inputs
          />
          <TouchableOpacity
            onPress={handleSubmitComment}
            disabled={!newComment.trim() || commentOnProduct.isPending}
            className={`ml-2 w-8 h-8 rounded-full items-center justify-center ${
              newComment.trim() ? "bg-primary" : "bg-gray-300"
            }`}
          >
            {commentOnProduct.isPending ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Ionicons name="send" size={16} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentSection;