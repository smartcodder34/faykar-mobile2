import { useDiscoverCategoryMutation } from "@/src/api-services/discoversApi/discoverMutation";
import { useGetLocationDetails } from "@/src/api-services/googlePlacesApi/googleQuery";
import { useProductCategories } from "@/src/api-services/productsApi/productQuery";
import CustomButton from "@/src/CustomComps/CustomButton";
import CustomInput from "@/src/CustomComps/CustomInput";
import CustomSelect from "@/src/CustomComps/CustomSelect";
import RangeSlider from "@/src/CustomComps/RangeSlider";
import { useLocationSearch } from "@/src/hooks/useLocationSearch";
import { Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ApplyFilterComp from "./ApplyFilterComp";

interface Item {
  title: string;
  value: string;
}

const ApplyFilter = () => {
  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 500;
  
  const [minPrice, setMinPrice] = useState(MIN_DEFAULT.toString());
  const [maxPrice, setMaxPrice] = useState(MAX_DEFAULT.toString());
  // Category states
  const [category1Open, setCategory1Open] = useState(false);
  const [category1Selected, setCategory1Selected] = useState<Item | null>(null);
  const [filterApplied, setFilterApplied] = useState(false);


  // const userLocation = useGetLocation().userLocation;

  const handleFilterApplied = () => {
    setFilterApplied(true);
  };

  const handlecloseFilterApplied = () => {
    setFilterApplied(false);
  };

  // api calls
  const getProductCategories = useProductCategories();
  const discoverCategoryMutation =
    useDiscoverCategoryMutation(handleFilterApplied);

  //category 1 data from api
  const newProductCategory = getProductCategories?.data?.data?.categories.map(
    (v: any) => {
      return {
        title: v.name,
        value: v.id,
      };
    }
  );

  const { control, handleSubmit, formState } = useForm();
  const {
    term,
    option,
    city,
    handleLocationChange,
    onOptionSelect,
    getSearchOptionQuery,
  } = useLocationSearch();

  const handleAddressSelect = (
    item: any,
    onChange: (value: string) => void
  ) => {
    onChange(item.description);
    onOptionSelect(item);
  };

  const getLocationData = useGetLocationDetails(city?.place_id);

  useEffect(() => {
    if (city) {
      getLocationData.refetch();
    }
  }, [city]);

  console.log("getLocationData", getLocationData?.data);
  // console.log("discoverCategoryMutation", discoverCategoryMutation?.data);
  // console.log("userLocation", userLocation);

  const handleApplyFilter = (data: any) => {
    const requestedPayload = {
      location: getLocationData?.data,
      minPrice,
      maxPrice,
      category: category1Selected,
      address: data.address,
    };
    console.log("requestedPayload33", requestedPayload);
    discoverCategoryMutation.mutate(requestedPayload);
  };
  console.log(
    "discoverCategoryMutation",
    discoverCategoryMutation?.data?.data?.products
  );

  // const getAllfilterData =
  //   minPrice &&
  //   maxPrice  &&
  //   category1Selected &&
  //   getLocationData?.data &&
  //   discoverCategoryMutation?.data?.data?.products;
  const getAllfilterData =
    minPrice !== "" &&
    maxPrice !== "" &&
    category1Selected !== null &&
    getLocationData?.data &&
    discoverCategoryMutation?.data?.data?.products;

  console.log("getAllfilterData", !getAllfilterData);
  // Update handleClose:
  const handleClose = () => {
    setCategory1Selected(null);
    setMinPrice(MIN_DEFAULT.toString());
    setMaxPrice(MAX_DEFAULT.toString());
    discoverCategoryMutation.reset();
  };

  return (
    <ScrollView className="bg-white flex-1">
      <View className="px-5 pt-4">
        {/* Location Section */}
        {filterApplied ? (
          <View>
            <View className="">
              <TouchableOpacity
                onPress={handlecloseFilterApplied}
                className="ml-1 items-end"
              >
                <View className=" items-center ">
                  <Fontisto name="close-a" size={16} color="black" />
                </View>
              </TouchableOpacity>
              <View className="flex-row justify-between mt-2">
                <View className="bg-green-600 px-4 py-2 rounded-full flex-row items-center">
                  <Text className="text-white font-medium mr-2">
                    {minPrice} -{maxPrice}
                  </Text>
                </View>
                <View className="bg-green-600 px-4 py-2 rounded-full flex-row items-center">
                  <Text className="text-white font-medium mr-2">
                    {getLocationData?.data?.city}
                  </Text>
                </View>
                <View className="bg-green-600 px-4 py-2 rounded-full flex-row items-center">
                  <View className="">
                    <Text className="text-white font-medium mr-2">
                      {category1Selected?.title}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <ApplyFilterComp
              discoverCategoryMutation={discoverCategoryMutation}
            />
          </View>
        ) : (
          <View>
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-900 mb-3">
                Location
              </Text>

              <View className=" my-3">
                <Controller
                  control={control}
                  name="address"
                  rules={{
                    required: "Address is required",
                  }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <>
                      <CustomInput
                        primary
                        label="Address"
                        placeholder="Enter your address"
                        value={term?.description || value}
                        onChangeText={(text) => {
                          onChange(text);
                          handleLocationChange(text);
                        }}
                        onBlur={onBlur}
                        // error={errors.address?.message}
                      />

                      {term && (
                        <ScrollView className="z-50 h-auto bg-primaryLight w-full rounded-lg">
                          {getSearchOptionQuery.isLoading ? (
                            <Text className="py-10 mx-auto">Loading...</Text>
                          ) : getSearchOptionQuery.isError ? (
                            <Text className="py-10 mx-auto">
                              Something went wrong
                            </Text>
                          ) : (
                            option.map((item: any) => (
                              <TouchableOpacity
                                key={item.place_id}
                                className="my-2 px-3"
                                onPress={() =>
                                  handleAddressSelect(item, onChange)
                                }
                              >
                                <Text className="font-[PoppinsRegular] text-[#6F649A]">
                                  {item.description}
                                </Text>
                              </TouchableOpacity>
                            ))
                          )}
                        </ScrollView>
                      )}
                    </>
                  )}
                />
              </View>
            </View>

            {/* Price Range Section */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-green-700">
                  Price Range
                </Text>
                <Text className="text-base font-medium text-gray-600">
                  ${minPrice}-${maxPrice}
                </Text>
              </View>

              {/* Range Slider Visual */}
              <View className="mb-4">
                {/* <View className="h-1 bg-gray-200 rounded-full">
                  <View
                    className="h-1 bg-green-700 rounded-full"
                    style={{ width: "70%" }}
                  />
                </View>
                <View className="flex-row justify-between mt-2">
                  <View
                    className="w-5 h-5 bg-green-700 rounded-full -mt-5"
                    style={{ marginLeft: "0%" }}
                  />
                  <View
                    className="w-5 h-5 bg-green-700 rounded-full -mt-5"
                    style={{ marginRight: "30%" }}
                  />
                </View> */}
                <RangeSlider
                  sliderWidth={300}
                  min={MIN_DEFAULT}
                  max={MAX_DEFAULT}
                  step={10}
                  onValueChange={(range) => {
                    setMinPrice(range.min.toString());
                    setMaxPrice(range.max.toString());
                  }}
                />
              </View>

              {/* Min Max Inputs */}
              <View className="flex-row gap-4">
                <View className="flex-1">
                  <TextInput
                    value={minPrice}
                    onChangeText={setMinPrice}
                    placeholder="Min"
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                  />
                </View>
                <View className="flex-1">
                  <TextInput
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                    placeholder="Max"
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900"
                  />
                </View>
              </View>
            </View>

            {/* Category Section */}
            <View className="mb-8">
              <Text className="text-lg font-semibold text-gray-900 mb-3">
                Category
              </Text>

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

            {/* Apply Filter Button */}
           
            <CustomButton
              primary
              title=" Apply Filter"
              onPress={handleSubmit(handleApplyFilter)}
              loading={discoverCategoryMutation.isPending}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ApplyFilter;
