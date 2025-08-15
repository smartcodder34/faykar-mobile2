// import React, { useEffect, useRef } from "react";
// import { Animated, View, StyleSheet } from "react-native";

// interface LoadingSpinnerProps {
//   size?: number;
// }

// const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40 }) => {
//   const rotation = useRef(new Animated.Value(0)).current;
//   const opacity = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     const spinAnimation = Animated.loop(
//       Animated.timing(rotation, {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: true,
//       })
//     );

//     const fadeAnimation = Animated.loop(
//       Animated.sequence([
//         Animated.timing(opacity, {
//           toValue: 0.3,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//         Animated.timing(opacity, {
//           toValue: 1,
//           duration: 1000,
//           useNativeDriver: true,
//         }),
//       ])
//     );

//     spinAnimation.start();
//     fadeAnimation.start();

//     return () => {
//       spinAnimation.stop();
//       fadeAnimation.stop();
//     };
//   }, [rotation, opacity]);

//   const spin = rotation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   return (
//     <View style={styles.container}>
//       <View
//         style={[
//           styles.background,
//           {
//             width: size + 20, // Slightly larger than the spinner
//             height: size + 20,
//             borderRadius: (size + 20) / 2,
//           },
//         ]}
//       />
//       <Animated.Image
//         source={require("@/assets/images/spinner-icon.png")}
//         style={[
//           styles.spinner,
//           {
//             width: size,
//             height: size,
//             transform: [{ rotate: spin }],
//             opacity: opacity,
//           },
//         ]}
//         resizeMode="contain"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   background: {
//     backgroundColor: "rgba(255, 255, 255, 0.8)", // White with 80% opacity
//     position: "absolute",
//   },
//   spinner: {},
// });

// export default LoadingSpinner;


import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";

interface LoadingSpinnerProps {
  size?: number;
  fullscreen?: boolean; // New prop for optional overlay
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  fullscreen = false,
}) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    const fadeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    spinAnimation.start();
    fadeAnimation.start();

    return () => {
      spinAnimation.stop();
      fadeAnimation.stop();
    };
  }, [rotation, opacity]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[fullscreen ? styles.overlay : null, styles.container]}>
      <View
        style={[
          styles.background,
          {
            width: size + 20,
            height: size + 20,
            borderRadius: (size + 20) / 2,
          },
        ]}
      />
      <Animated.Image
        source={require("@/assets/images/spinner-icon.png")}
        style={[
          styles.spinner,
          {
            width: size,
            height: size,
            transform: [{ rotate: spin }],
            opacity: opacity,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black
    zIndex: 9999,
  },
  background: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // White with 80% opacity
    position: "absolute",
  },
  spinner: {},
});

export default LoadingSpinner;
