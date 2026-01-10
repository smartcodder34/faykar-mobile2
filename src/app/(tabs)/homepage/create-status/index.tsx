import CustomButton from "@/src/CustomComps/CustomButton";
import { useCreateStatusStoryMutation } from "@/src/api-services/statusStoryApi/statusMutation";
import StoryUploadImage from "@/src/components/StoryUploadImage";
import Screen from "@/src/layout/Screen";
import { rS } from "@/src/lib/responsivehandler";
import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import { useRouter } from "expo-router";
import { Upload } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const resizeImage = async (uri: any) => {
  const resizedPhoto = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 200 } }], // resize to width of 300 and preserve aspect ratio
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // compress and set format
  );
  return resizedPhoto;
};



const CreateStatus = () => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<any>(null);

  // MUTATION
  const createStatusStory = useCreateStatusStoryMutation();

  
  const onSubmit = async () => {
    try {
      if (!imageFile) {
        Alert.alert("Missing Image", "Please select an image");
        return;
      }

      const resized = await resizeImage(imageFile.uri);

      const formData = new FormData();

      formData.append("status_image", {
        uri: resized.uri,
        type: "image/jpeg",
        name: imageFile?.fileName || `upload_${Date.now()}.jpg`,
      } as any);

      createStatusStory.mutate(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <Screen>
      
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#2E6939" />
        </TouchableOpacity>
        <View>
          <Text
            className="font-[InterSemiBold] text-primary text-center"
            style={{ fontSize: rS(18) }}
          >
            Create Your Story
          </Text>
        </View>
        <View className="w-6" /> 
      </View>

      {/* Main Content */}
      <View className="flex-1 p-4">
        <StoryUploadImage uploadData={imageFile} setUploadData={setImageFile} />

        {/* Footer/Action Button */}
        <View className="pt-6">
          <CustomButton
            title="Add a Story"
            primary
            disabled={!imageFile || createStatusStory.isPending}
            loading={createStatusStory.isPending}
            onPress={onSubmit}
            icon={<Upload size={18} color="white" />}
            iconPostion="left"
          />
        </View>
      </View>
    </Screen>
  );
};

export default CreateStatus;
