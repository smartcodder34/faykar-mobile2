// import React, { useEffect, useRef, useState } from "react";
// import {
//     Dimensions,
//     FlatList,
//     Image,
//     ImageSourcePropType,
//     NativeScrollEvent,
//     NativeSyntheticEvent,
//     StyleSheet,
//     View
// } from "react-native";

// // Define types for our slider data
// interface SliderItem {
//   id: string;
//   img: ImageSourcePropType;
// }

// // Props for the SliderComp component (if needed)
// interface SliderCompProps {
//   autoScrollInterval?: number; // Optional prop to control scroll speed
// }

// const OnBoardingSlider: React.FC<SliderCompProps> = ({
//   autoScrollInterval = 3000,
// }) => {
//   const screenWidth = Dimensions.get("window").width;
//   const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
//   const [contentWidth, setContentWidth] = useState<number>(screenWidth);
//   const flatListRef = useRef<FlatList<SliderItem> | null>(null);
//   const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

//   const sliderData: SliderItem[] = [
//     {
//       id: "1",
//       img: require("@/assets/images/onboarding.png"),
//     },
//     {
//       id: "2",
//       img: require("@/assets/images/onboarding2.png"),
//     },
//     {
//       id: "3",
//       img: require("@/assets/images/onboarding3.png"),
//     }
    
//   ];

//   // Auto scroll function
//   const autoScroll = (): void => {
//     if (flatListRef.current) {
//       const nextIndex = (currentSlideIndex + 1) % sliderData.length;
//       flatListRef.current.scrollToOffset({
//         offset: nextIndex * contentWidth,
//         animated: true,
//       });
//     }
//   };

//   // Setup auto scroll timer
//   useEffect(() => {
//     // Start auto-scrolling
//     autoScrollTimer.current = setInterval(autoScroll, autoScrollInterval);

//     // Cleanup timer when component unmounts
//     return () => {
//       if (autoScrollTimer.current) {
//         clearInterval(autoScrollTimer.current);
//       }
//     };
//   }, [currentSlideIndex, contentWidth, autoScrollInterval]);

//   // Manually measure the FlatList container width
//   const onFlatListLayout = (event: any): void => {
//     const { width } = event.nativeEvent.layout;
//     setContentWidth(width);
//   };

//   const renderItem = ({ item }: { item: SliderItem }): React.ReactElement => {
//     return (
//       <View style={{ width: contentWidth }}>
//         <Image
//           source={item.img}
//           className="w-full h-full"
//           // resizeMode="cover"
//         />
//       </View>
//     );
//   };

//   const handleScroll = (
//     event: NativeSyntheticEvent<NativeScrollEvent>
//   ): void => {
//     // Reset timer when user manually scrolls
//     if (autoScrollTimer.current) {
//       clearInterval(autoScrollTimer.current);
//       autoScrollTimer.current = setInterval(autoScroll, autoScrollInterval);
//     }

//     const contentOffsetX = event.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(contentOffsetX / contentWidth);
//     setCurrentSlideIndex(currentIndex);
//   };

//   const footerIndicator = (): React.ReactElement[] => {
//     return sliderData.map((_, index) => (
//       <View
//         key={index}
//         style={{
//           backgroundColor: currentSlideIndex === index ? "#0FD46A" : "#DBDBDB",
//           width: 8,
//           height: 8,
//           borderRadius: 8,
//           marginHorizontal: 5,
//         }}
//       />
//     ));
//   };

//   // Reset to the first slide whenever contentWidth changes
//   useEffect(() => {
//     if (flatListRef.current && contentWidth > 0) {
//       flatListRef.current.scrollToOffset({ offset: 0, animated: false });
//       setCurrentSlideIndex(0);
//     }
//   }, [contentWidth]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.flatListContainer} onLayout={onFlatListLayout}>
//         <FlatList
//           ref={flatListRef}
//           keyExtractor={(item: SliderItem) => item.id}
//           showsHorizontalScrollIndicator={false}
//           data={sliderData}
//           renderItem={renderItem}
//           horizontal
//           pagingEnabled
//           onScroll={handleScroll}
//           onMomentumScrollEnd={handleScroll}
//           snapToInterval={contentWidth}
//           decelerationRate="fast"
//           snapToAlignment="start"
//         />
//       </View>
//       {/* <View style={styles.indicatorContainer}>{footerIndicator()}</View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//   },
//   flatListContainer: {
//     width: "100%",
//   },
//   indicatorContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
// });

// export default OnBoardingSlider;


import { rS } from "@/src/lib/responsivehandler";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Define types for our slider data
interface SliderItem {
  id: string;
  img: ImageSourcePropType;
  title: string;
  subtitle: string;
}

// Props for the SliderComp component (if needed)
interface SliderCompProps {
  autoScrollInterval?: number; // Optional prop to control scroll speed
}

const OnBoardingSlider: React.FC<SliderCompProps> = ({
  autoScrollInterval = 4000,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [contentWidth, setContentWidth] = useState<number>(screenWidth);
  const flatListRef = useRef<FlatList<SliderItem> | null>(null);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const sliderData: SliderItem[] = [
    {
      id: "1",
      img: require("@/assets/images/onboarding.png"),
      title: "Various Collection of The Latest Product",
      subtitle:
        "Discover our newest arrivals, featuring trendy and high-quality selections.",
    },
    {
      id: "2",
      img: require("@/assets/images/onboarding2.png"),
      title: "Complete Collection of Fresh Produce",
      subtitle:
        "Find every color and size to match your perfect style effortlessly.",
    },
    {
      id: "3",
      img: require("@/assets/images/onboarding3.png"),
      title: "Find the Most Suitable Fresh Food",
      subtitle:
        "Explore stylish outfits tailored to your taste, fit, and occasion.",
    },
  ];

  // Auto scroll function
  const autoScroll = (): void => {
    if (flatListRef.current) {
      const nextIndex = (currentSlideIndex + 1) % sliderData.length;
      flatListRef.current.scrollToOffset({
        offset: nextIndex * contentWidth,
        animated: true,
      });
    }
  };

  // Setup auto scroll timer
  useEffect(() => {
    // Start auto-scrolling
    autoScrollTimer.current = setInterval(autoScroll, autoScrollInterval);

    // Cleanup timer when component unmounts
    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [currentSlideIndex, contentWidth, autoScrollInterval]);

  // Manually measure the FlatList container width
  const onFlatListLayout = (event: any): void => {
    const { width } = event.nativeEvent.layout;
    setContentWidth(width);
  };

  const renderItem = ({ item }: { item: SliderItem }): React.ReactElement => {
    return (
      <View
        style={{ width: contentWidth }}
        className="items-center justify-center px-6"
      >
        {/* Image Container with styling similar to the uploaded image */}
        <View className=" items-center justify-center   mb-8 ">
          <Image
            source={item.img}
            className="w-96 h-96 rounded-3xl"
            resizeMode="cover"
            // style={{
            //   shadowColor: "#000",
            //   shadowOffset: {
            //     width: 0,
            //     height: 10,
            //   },
            //   shadowOpacity: 0.1,
            //   shadowRadius: 20,
            // }}
          />
        </View>

        {/* Text Content */}
        <View className="items-center px-4">
          <Text
            className="font-[PlusJakartaSansMedium] text-center text-black mb-4"
            style={{ fontSize: rS(24) }}
          >
            {item.title}
          </Text>
          <Text
            className="font-[PlusJakartaSansRegular] text-center text-gray-600"
            style={{ fontSize: rS(12) }}
          >
            {item.subtitle}
          </Text>
        </View>
      </View>
    );
  };

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ): void => {
    // Reset timer when user manually scrolls
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = setInterval(autoScroll, autoScrollInterval);
    }

    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / contentWidth);
    setCurrentSlideIndex(currentIndex);
  };

  const footerIndicator = (): React.ReactElement[] => {
    return sliderData.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: currentSlideIndex === index ? "#2E6939" : "#E5E7EB",
          width: currentSlideIndex === index ? 24 : 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: 4,
          //   transition: "all 0.3s ease",
        }}
      />
    ));
  };

  // Reset to the first slide whenever contentWidth changes
  useEffect(() => {
    if (flatListRef.current && contentWidth > 0) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
      setCurrentSlideIndex(0);
    }
  }, [contentWidth]);

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer} onLayout={onFlatListLayout}>
        <FlatList
          ref={flatListRef}
          keyExtractor={(item: SliderItem) => item.id}
          showsHorizontalScrollIndicator={false}
          data={sliderData}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScroll}
          snapToInterval={contentWidth}
          decelerationRate="fast"
          snapToAlignment="start"
        />
      </View>

      {/* Pagination Dots */}
      <View style={styles.indicatorContainer}>{footerIndicator()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  flatListContainer: {
    flex: 1,
    width: "100%",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});

export default OnBoardingSlider;