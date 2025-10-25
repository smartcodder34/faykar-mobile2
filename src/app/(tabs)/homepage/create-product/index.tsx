import { useCreateProduct } from "@/src/api-services/productsApi/productMutation";
import {
  useProductCategories,
  useSubProductCategories,
} from "@/src/api-services/productsApi/productQuery";
import CustomButton from "@/src/CustomComps/CustomButton";
import CustomSelect from "@/src/CustomComps/CustomSelect";
import Screen from "@/src/layout/Screen";
import { rS, rV } from "@/src/lib/responsivehandler";
import useGetLocation from "@/src/store/locationStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
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
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // compress and set format
  );
  return resizedPhoto;
};

const CreateProduct = () => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm();

  // Form state
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryAvailable, setDeliveryAvailable] = useState<"1" | "0">(
    "0"
  );

  const firstTimeRef = React.useRef(true);
  // const [selected, setSelected] = React.useState<any | null>(null);

  const [imageSelected, setImageSelected] = React.useState<string | null>(null);

  const [uploadData, setUploadData] = React.useState(Array(4).fill(null));
  const [currentIndex, setCurrentIndex] = React.useState<number | any>();

  // Category states
  const [category1Open, setCategory1Open] = useState(false);
  const [category1Selected, setCategory1Selected] = useState<Item | null>(null);

  const [category2Open, setCategory2Open] = useState(false);
  const [category2Selected, setCategory2Selected] = useState<Item | null>(null);

  //MUTATION
  const getProductCategories = useProductCategories();
  const getSubProductCategories = useSubProductCategories(
    category1Selected?.value
  );
  const createListingMutation = useCreateProduct();

  const userLocation = useGetLocation().userLocation;

  // console.log("userLocation from create product:", userLocation);

  //category 1 data from api
  const newProductCategory = getProductCategories?.data?.data?.categories.map(
    (v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    }
  );

  const newSubProductCategory =
    getSubProductCategories?.data?.data?.sub_categories?.map((v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    });

  // console.log("getProductCategorie200s", newProductCategory);
  // console.log("newSubProductCategory:", newSubProductCategory);

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

  console.log("uploadData", uploadData);
  console.log("imageSelected123:", imageSelected);

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
          })
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
    <Screen className="bg-white" scroll={true}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
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
        className="flex-1 px-6 pb-20"
        showsVerticalScrollIndicator={false}
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
            className="bg-[#2E693945] rounded-2xl px-4 py-3"
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
        <View className="mb-6">
          <Text
            className="mb-3 font-[PoppinsMedium] text-black"
            style={{ fontSize: rS(14) }}
          >
            Description
          </Text>
          <View
            className="bg-[#2E693945] rounded-2xl p-4"
            style={{ height: rV(80) }}
          >
            <Controller
              control={control}
              name="description"
              rules={{
                required: "Description is required",
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <TextInput
                  placeholder="Enter product description..."
                  placeholderTextColor="#2E6939"
                  // value={description}
                  // onChangeText={setDescription}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  textAlignVertical="top"
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

        {/* First Category Selector */}
        <View className="mb-6">
          <CustomSelect
            label="Select Category"
            primary
            selected={category1Selected}
            setSelected={setCategory1Selected}
            openDropDown={category1Open}
            setOpenDropDown={setCategory1Open}
            placeholder="Choose category"
            // dataItem={category1Data}
            dataItem={newProductCategory}
          />
        </View>

        {/* Second Category Selector */}
        <View className="mb-6">
          <CustomSelect
            label="Select Sub Category"
            primary
            selected={category2Selected}
            setSelected={setCategory2Selected}
            openDropDown={category2Open}
            setOpenDropDown={setCategory2Open}
            placeholder="Choose category"
            dataItem={newSubProductCategory}
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
          <View className="flex-row space-x-6">
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
              className="flex-row items-center"
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

        {/* Price Section */}
        <View className="mb-8">
          <Text
            className="mb-3 font-[PoppinsMedium] text-black"
            style={{ fontSize: rS(14) }}
          >
            Price
          </Text>
          <View
            className="bg-[#2E693945] rounded-2xl px-4 py-3"
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
