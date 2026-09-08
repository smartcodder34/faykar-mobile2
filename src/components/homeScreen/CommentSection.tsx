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
import { KeyboardStickyView } from "react-native-keyboard-controller";

interface CommentSectionProps {
  getProductCommentLists: any;
  getUserProduct: any;
  ListHeaderComponent?: React.ReactElement | null;
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
      },
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

  // return (
  //   <View className="flex-1 bg-white">
  //     <FlatList
  //       data={comments}
  //       renderItem={renderComment}
  //       keyExtractor={(item) => item.id.toString()}
  //       ListHeaderComponent={ListHeaderComponent}
  //       contentContainerStyle={{ paddingBottom: 20 }}
  //       ListEmptyComponent={
  //         !getProductCommentLists.isLoading ? (
  //           <View className="items-center py-10">
  //             <Text className="text-gray-400">
  //               No comments yet. Be the first!
  //             </Text>
  //           </View>
  //         ) : null
  //       }
  //     />

  // <KeyboardStickyView
  //   enabled={Platform.OS === "ios"}
  //   offset={{ opened: 0, closed: 0 }}
  // >
  //   <View className="p-4 border-t border-gray-100 bg-white">
  //     <View className="flex-row items-center bg-white rounded-full px-4 py-1 border border-gray-200">
  //       <TextInput
  //         value={newComment}
  //         onChangeText={setNewComment}
  //         placeholder="Write a comment..."
  //         className="flex-1 h-10 text-sm text-gray-800"
  //         multiline={false}
  //         returnKeyType="send"
  //         onSubmitEditing={handleSubmitComment}
  //       />
  //       <TouchableOpacity
  //         onPress={handleSubmitComment}
  //         disabled={!newComment.trim() || commentOnProduct.isPending}
  //         className={`ml-2 w-8 h-8 rounded-full items-center justify-center ${
  //           newComment.trim() ? "bg-primary" : "bg-gray-300"
  //         }`}
  //       >
  //         {commentOnProduct.isPending ? (
  //           <ActivityIndicator color="#fff" size="small" />
  //         ) : (
  //           <Ionicons name="send" size={16} color="white" />
  //         )}
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // </KeyboardStickyView>
  //   </View>
  // );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          !getProductCommentLists.isLoading ? (
            <View className="items-center py-10">
              <Text className="text-gray-400">
                No comments yet. Be the first!
              </Text>
            </View>
          ) : null
        }
      />

      <KeyboardStickyView offset={{ opened: 0, closed: 0 }}>
        <View className="p-4 border-t border-gray-100 bg-white">
          <View className="flex-row items-center bg-white rounded-full px-4 py-1 border border-gray-200">
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Write a comment..."
              className="flex-1 h-10 text-sm text-gray-800"
              multiline={false}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment}
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
      </KeyboardStickyView>
    </View>
  );
};

export default CommentSection;
