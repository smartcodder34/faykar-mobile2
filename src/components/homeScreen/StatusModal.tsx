import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const STORY_DURATION = 5000; // 5 seconds

const StatusModal = ({ visible, onClose, storyGroup }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      startAnimation();
    } else {
      progress.setValue(0);
      setCurrentIndex(0);
    }
  }, [visible, currentIndex]);

  const startAnimation = () => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: STORY_DURATION,
      useNativeDriver: false, // width animation requires false
    }).start(({ finished }) => {
      if (finished) {
        nextStory();
      }
    });
  };

  const nextStory = () => {
    if (currentIndex < storyGroup.stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // If on first story, restart it
      startAnimation();
    }
  };

  const handlePress = (evt: any) => {
    const x = evt.nativeEvent.locationX;
    if (x < width / 2) {
      prevStory();
    } else {
      nextStory();
    }
  };

  if (!storyGroup) return null;
  const currentStory = storyGroup.stories[currentIndex];

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <View style={styles.container}>
        {/* Animated Progress Bars */}
        <View style={styles.progressBarContainer}>
          {storyGroup.stories.map((_: any, index: number) => (
            <View key={index} style={styles.progressBackground}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width:
                      index < currentIndex
                        ? "100%"
                        : index === currentIndex
                        ? progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"],
                          })
                        : "0%",
                  },
                ]}
              />
            </View>
          ))}
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View className="flex-row items-center">
            <Image
              source={{ uri: storyGroup.profileImg }}
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.username}>{storyGroup.name}</Text>
              <Text className="text-gray-300 text-[10px]">Just now</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} hitSlop={20}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePress}
          style={styles.contentArea}
        >
          <Image
            source={{ uri: currentStory.media_path }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  progressBarContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 55,
    width: "100%",
    paddingHorizontal: 10,
    zIndex: 20,
  },
  progressBackground: {
    flex: 1,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 2,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    position: "absolute",
    top: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    zIndex: 20,
    alignItems: "center",
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  username: { color: "white", fontWeight: "bold", fontSize: 14 },
  contentArea: { flex: 1, justifyContent: "center", alignItems: "center" },
  fullImage: { width: width, height: height },
});

export default StatusModal;
