import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ImageSourcePropType,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View
} from "react-native";

// Define types for our slider data
interface SliderItem {
  id: string;
  img: ImageSourcePropType;
}

// Props for the SliderComp component (if needed)
interface SliderCompProps {
  autoScrollInterval?: number; // Optional prop to control scroll speed
}

const OnBoardingSlider: React.FC<SliderCompProps> = ({
  autoScrollInterval = 3000,
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
    },
    {
      id: "2",
      img: require("@/assets/images/onboarding2.png"),
    },
    {
      id: "3",
      img: require("@/assets/images/onboarding3.png"),
    }
    
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
      <View style={{ width: contentWidth }}>
        <Image
          source={item.img}
          className="w-full h-full"
          // resizeMode="cover"
        />
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
          backgroundColor: currentSlideIndex === index ? "#0FD46A" : "#DBDBDB",
          width: 8,
          height: 8,
          borderRadius: 8,
          marginHorizontal: 5,
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
      {/* <View style={styles.indicatorContainer}>{footerIndicator()}</View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  flatListContainer: {
    width: "100%",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
});

export default OnBoardingSlider;
