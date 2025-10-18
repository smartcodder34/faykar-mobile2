import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";



// Helper function to get the correct image source
const getImageSource = (item: any) => {
  // If item.image exists (local require), use it
  if (item.image) {
    return item.image;
  }

  // If item.images exists, handle array or single value
  if (item.images) {
    if (Array.isArray(item.images)) {
      // Check if first element is also an array
      const firstImage = item.images[0];
      if (Array.isArray(firstImage)) {
        return { uri: firstImage[0] };
      }
      return { uri: firstImage };
    }
    return { uri: item.images };
  }

  // Fallback to a placeholder or null
  return null;
};



// Main Component
const PostsGrid = ({ userProducts }:any) => {
    const router = useRouter()
    
    const handleViewProduct = (itemId: string) => {
      router.push({
        pathname: `/(tabs)/profilepage/view-profile-product`,
        params: { item: JSON.stringify(itemId) },
      });
    };

    const renderPostItem = ({ item, index }: { item: any; index: number }) => {
      const imageSource = getImageSource(item);

      return (
        <View
          style={{
            width: "33.33%",
            aspectRatio: 1,
            padding: 2,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
            }}
            activeOpacity={0.8}
            onPress={() => handleViewProduct(item.id)}
          >
            <Image
              source={imageSource}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 12,
              }}
              resizeMode="cover"
              onError={(error) => console.log("Image error:", error)}
            />

            <Text className=" text-center font-[PoppinsMedium] my-2">
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={userProducts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        columnWrapperStyle={{
          flexWrap: "wrap",
        }}
      />
    </View>
  );
};

export default PostsGrid;