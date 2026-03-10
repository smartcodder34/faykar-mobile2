import { useCreateProduct } from "@/src/api-services/productsApi/productMutation";
import {
  useProductCategories,
  useSubProductCategories,
} from "@/src/api-services/productsApi/productQuery";
import CustomButton from "@/src/CustomComps/CustomButton";
import CustomSelect from "@/src/CustomComps/CustomSelect";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import currencyData from "@/src/mocks/currencies.json";
import useGetLocation from "@/src/store/locationStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Item {
  title: string;
  value: string;
}
const resizeImage = async (uri: any) => {
  const resizedPhoto = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 200 } }], // resize to width of 300 and preserve aspect ratio
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }, // compress and set format
  );
  return resizedPhoto;
};

const CreateProduct = () => {
  const router = useRouter();
  // const { control, handleSubmit, formState } = useForm();
  const [voiceMemoUri, setVoiceMemoUri] = useState(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = React.useRef<Audio.Sound | null>(null);

  const { control, handleSubmit, formState, setValue, watch } = useForm();

  // Form state
  const [deliveryAvailable, setDeliveryAvailable] = useState<"1" | "0">("0");

  const firstTimeRef = React.useRef(true);
  // const [selected, setSelected] = React.useState<any | null>(null);
  const [imageSelected, setImageSelected] = React.useState<string | null>(null);

  const [uploadData, setUploadData] = React.useState(Array(4).fill(null));
  const [currentIndex, setCurrentIndex] = React.useState<number | any>();

  // Category states
  const [category1Selected, setCategory1Selected] = useState<Item | null>(null);
  const [category2Selected, setCategory2Selected] = useState<Item | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState<Item | null>(null);

  // START RECORDING
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
        );
        setRecording(recording);
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  // STOP RECORDING
  async function stopRecording() {
    setRecording(null);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    setRecordedUri(uri || null);
  }

  // PLAY RECORDING
  async function playSound() {
    if (recordedUri) {
      setIsPlaying(true);
      const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
      soundRef.current = sound;
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) setIsPlaying(false);
      });
    }
  }

  //MUTATION
  const getProductCategories = useProductCategories();
  const getSubProductCategories = useSubProductCategories(
    category1Selected?.value,
  );
  const createListingMutation = useCreateProduct();

  const userLocation = useGetLocation().userLocation;

  //category 1 data from api
  const newProductCategory = getProductCategories?.data?.data?.categories.map(
    (v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    },
  );

  const newSubProductCategory =
    getSubProductCategories?.data?.data?.sub_categories?.map((v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    });

  const newcurrencyData = Object.entries(currencyData || {}).map(
    ([code, value]: [string, any]) => ({
      title: `${value.name} (${code})`,
      value: value.symbol,
    }),
  );

  React.useEffect(() => {
    if (imageSelected) {
      const updatedArray = [...uploadData];
      updatedArray[currentIndex] = imageSelected;
      setUploadData(updatedArray);
    }
  }, [imageSelected]);

  const handleImagePick = async (index: number) => {
    setCurrentIndex(index);
    try {
      // No permissions request is necessary for launching the image library
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageSelected(result.assets[0].uri);
        console.log("result.assets", result.assets[0].uri);
      }
    } catch (error) {
      console.log("error form image upload", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadData((prev) => {
      const newData = [...prev];
      newData[index] = null; // Set to null instead of removing the element
      return newData;
    });
  };

  //ONSUBMIT
  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      // Handle image resizing first - using Promise.all to process all images concurrently
      const resizedImages = await Promise.all(
        uploadData
          .filter((img) => img !== null) // Filter out null values
          .map(async (img) => {
            const resizedPhoto = await resizeImage(img);
            return {
              uri: resizedPhoto.uri,
              type: "image/jpeg",
              name: "file.jpg",
            };
          }),
      );

      // Add all resized images to formData
      resizedImages.forEach((fileInfo) => {
        formData.append("product_images[]", fileInfo as any);
      });

      // Append all other form data
      formData.append("product_name", data?.title);
      formData.append("product_description", data?.description);
      formData.append("category_id", category1Selected?.value as any);
      formData.append("sub_category_id", category2Selected?.value as any);
      formData.append("currency", selectedCurrency?.value as any);
      formData.append("amount", data?.amount);
      formData.append("is_delivery_available", deliveryAvailable);
      formData.append("latitude", String(userLocation?.user_latitude || ""));
      formData.append("longitude", String(userLocation?.user_longitude || ""));
      formData.append("location", userLocation?.user_address || "");

      // Submit the form
      console.log("formData entries:", formData);
      createListingMutation.mutate(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error appropriately
    }
  };

  return (
    // <ScrollView className="bg-white" style={{ flex: 1 }}>
    <Screen
      scroll={true}
      keyboardAware={true}
      dismissKeyboardOnTap={true}
      className="bg-white"
      contentClassName="px-6" // Move your horizontal padding here
    >
      {/* Header */}
      <View className="flex-row items-center justify-between  py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2E6939" />
        </TouchableOpacity>

        <Text className="text-lg font-[PoppinsSemiBold] text-primary">
          Post
        </Text>

        <View />
      </View>

      {/* Form Content */}
      <ScrollView
        className="flex-1  pb-20"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Select Image(s) Section */}
        <View className="mb-6">
          <Text
            className="mb-3 font-[PoppinsMedium] text-black"
            style={{ fontSize: rS(14) }}
          >
            Select Image(s)
          </Text>

          <View className=" flex-1 flex-row justify-between">
            {uploadData?.map((item: string, index: number) => (
              <>
                <View className="flex-1" key={index}>
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleImagePick(index)}
                  >
                    {item ? (
                      <View className="h-32 rounded-md  border border-[#D3D3D3] m-1 items-center justify-center">
                        {/* {currentIndex === index ? (
                            <ActivityIndicator />
                          ) : ( */}
                        <Image
                          source={{ uri: item }}
                          style={{ width: "100%", height: "100%" }}
                        />
                        {/* )} */}
                      </View>
                    ) : (
                      <View className=" h-32 rounded-md bg-[#2E693945] border border-[#D3D3D3] m-1 items-center justify-center">
                        {/* {currentIndex === index ? (
                            <ActivityIndicator />
                          ) : ( */}
                        <AntDesign
                          name="plus"
                          size={24}
                          className="!text-primary"
                        />
                        {/* )} */}
                      </View>
                    )}
                  </TouchableOpacity>

                  <View className="flex-row justify-center items-center">
                    {item && ( // Only show remove button if there's an image
                      <TouchableOpacity
                        onPress={() => handleRemoveImage(index)}
                      >
                        <Text className="text-xs text-red-400">Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </>
            ))}
          </View>
        </View>

        {/* Title Section */}
        <View className="mb-8">
          <Text
            className="mb-3 font-[PoppinsMedium] text-black"
            style={{ fontSize: rS(14) }}
          >
            Product Name
          </Text>
          <View
            className="bg-[#2E693945] rounded-2xl px-4"
            style={{ height: rV(45) }}
          >
            <Controller
              control={control}
              name="title"
              rules={{
                required: "Product name is required",
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextInput
                  placeholder="Enter Product Title"
                  placeholderTextColor="#2E6939"
                  value={value}
                  onChangeText={onChange}
                  // error={error?.amount.message}
                  style={{
                    fontSize: rS(14),

                    color: "#2E6939",
                    flex: 1,
                  }}
                />
              )}
            />
          </View>
        </View>

        {/* Description Section */}
        {/* <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text
              className="font-[PoppinsMedium] text-black"
              style={{ fontSize: rS(14) }}
            >
              Description
            </Text>
        
            <View className="flex-row items-center opacity-50">
              <Ionicons name="mic-outline" size={14} color="#2E6939" />
              <Text className="ml-1 text-[10px] font-[PoppinsRegular] text-primary">
                Supports Keyboard Dictation
              </Text>
            </View>
          </View>

          <View
            className="bg-[#2E693945] rounded-2xl p-4"
            style={{ height: rV(120) }}
          >
            <Controller
              control={control}
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder="Tip: Tap the mic on your keyboard to speak..."
                  placeholderTextColor="#2E6939"
                  value={value}
                  onChangeText={onChange}
                  multiline={true}
                  textAlignVertical="top"
              
                  autoCorrect={true}
                  spellCheck={true}
                  keyboardType="default"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  style={{
                    fontSize: rS(14),
                    color: "#2E6939",
                    flex: 1,
                  }}
                />
              )}
            />
          </View>
        </View> */}

        {/* Description Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text
              className="font-[PoppinsMedium] text-black"
              style={{ fontSize: rS(14) }}
            >
              Description & Voice Note
            </Text>

            <View className="flex-row items-center space-x-4">
              {recordedUri && (
                <TouchableOpacity
                  onPress={playSound}
                  className="flex-row items-center bg-primary/10 px-2 py-1 rounded-full"
                >
                  <Ionicons
                    name={isPlaying ? "pause-circle" : "play-circle"}
                    size={18}
                    color="#2E6939"
                  />
                  <Text className="ml-1 text-[10px] text-primary">
                    Play Memo
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={recording ? stopRecording : startRecording}
                className={`flex-row items-center px-2 py-1 rounded-full ${recording ? "bg-red-100" : "bg-primary/10"}`}
              >
                <Ionicons
                  name={recording ? "stop-circle" : "mic-outline"}
                  size={18}
                  color={recording ? "red" : "#2E6939"}
                />
                <Text
                  style={{ color: recording ? "red" : "#2E6939" }}
                  className="ml-1 text-[10px] font-[PoppinsRegular]"
                >
                  {recording ? "Stop" : "Record"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            className="bg-[#2E693945] rounded-2xl p-4"
            style={{ height: rV(120) }}
          >
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  placeholder="Describe your product or record a voice note..."
                  placeholderTextColor="#2E6939"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  textAlignVertical="top"
                  style={{ fontSize: rS(14), color: "#2E6939", flex: 1 }}
                />
              )}
            />
          </View>
        </View>

        {/* First Category Selector */}
        <View className="mb-6">
          <CustomSelect
            label="Select Category"
            primary
            selected={category1Selected}
            setSelected={setCategory1Selected}
            placeholder="Choose category"
            dataItem={newProductCategory || []}
          />
        </View>

        {/* Second Category Selector */}
        <View className="mb-6">
          <CustomSelect
            label="Select Sub Category"
            primary
            selected={category2Selected}
            setSelected={setCategory2Selected}
            placeholder="Choose sub category"
            dataItem={newSubProductCategory || []}
          />
        </View>

        {/* Delivery Availability Section */}
        <View className="mb-6">
          <Text
            className="mb-3 font-[PoppinsMedium] text-black"
            style={{ fontSize: rS(14) }}
          >
            Is Delivery Available
          </Text>
          <View className="flex-row space-x-6 items-center">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setDeliveryAvailable("1")}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 mr-2 items-center justify-center ${
                  deliveryAvailable === "1"
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {deliveryAvailable === "1" && (
                  <View className="w-3 h-3 bg-primary rounded-full" />
                )}
              </View>
              <Text
                className="font-[PoppinsMedium] text-black"
                style={{ fontSize: rS(14) }}
              >
                Yes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center mx-3"
              onPress={() => setDeliveryAvailable("0")}
            >
              <View
                className={`w-5 h-5 rounded-full border-2 mr-2 items-center justify-center ${
                  deliveryAvailable === "0"
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              >
                {deliveryAvailable === "0" && (
                  <View className="w-3 h-3 bg-primary rounded-full" />
                )}
              </View>
              <Text
                className="font-[PoppinsMedium] text-black"
                style={{ fontSize: rS(14) }}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-6">
          <CustomSelect
            label="Select Currency"
            primary
            selected={selectedCurrency}
            setSelected={setSelectedCurrency}
            placeholder="Choose Select Currency"
            dataItem={newcurrencyData || []}
          />
        </View>

        {/* Price Section */}
        <View className="mb-8">
          <Text
            className="mb-3 font-[PoppinsMedium] text-black"
            style={{ fontSize: rS(14) }}
          >
            Price
          </Text>
          <View
            className="bg-[#2E693945] rounded-2xl px-4 "
            style={{ height: rV(45) }}
          >
            <Controller
              control={control}
              name="amount"
              rules={{
                required: "Amount is required",
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextInput
                  placeholder="Enter price"
                  placeholderTextColor="#2E6939"
                  // value={price}
                  // onChangeText={setPrice}
                  value={value}
                  onChangeText={onChange}
                  // error={error?.amount.message}
                  keyboardType="numeric"
                  style={{
                    fontSize: rS(14),
                    color: "#2E6939",
                    flex: 1,
                  }}
                />
              )}
            />
          </View>
        </View>

        {/* Upload Button */}
        <View className="mb-8">
          <CustomButton
            title="Upload"
            onPress={handleSubmit(onSubmit)}
            loading={createListingMutation.isPending}
            disabled={
              createListingMutation.isPending ||
              !formState.isValid ||
              !category1Selected ||
              !category2Selected ||
              uploadData.every((img) => img === null)
            }
            primary
            style={{ height: rV(50) }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default CreateProduct;
