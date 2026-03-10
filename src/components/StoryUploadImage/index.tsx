import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const StoryUploadImage = ({ uploadData, setUploadData }: any) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImagePick = async () => {
    // Request permissions (important for iOS/Android)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your photos to upload a story.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      // In React Native, 'uploadData' usually stores the URI or a File-like object
      setUploadData(asset);
      setPreviewUrl(asset.uri);
    }
  };

  const handleRemoveImage = () => {
    setUploadData(null);
    setPreviewUrl(null);
  };

  return (
    <View className="w-full max-w-sm mx-auto p-4">
      <TouchableOpacity
        onPress={handleImagePick}
        activeOpacity={0.7}
        className="w-full"
      >
        {previewUrl ? (
          <View className="h-64 rounded-xl border-2 border-gray-300 overflow-hidden bg-gray-50">
            <Image
              source={{ uri: previewUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        ) : (
          <View className="h-64 rounded-xl bg-green-100 border-2 border-dashed border-green-300 flex flex-col items-center justify-center">
            <Entypo name="plus" size={30} color="black" />
          </View>
        )}
      </TouchableOpacity>

      <View className="flex flex-row justify-center items-center mt-2">
        {previewUrl && (
          <TouchableOpacity onPress={handleRemoveImage} className="p-2">
            <Text className="text-xs text-red-400 font-medium">Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default StoryUploadImage;
