// import { Tabs } from "expo-router";
// import { Platform } from "react-native";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       initialRouteName="homepage/index"
//       screenOptions={{
//         // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: "absolute",
//           },
//           default: {},
//         }),
//       }}
//       backBehavior="history"
//     >
//       <Tabs.Screen
//         name="homepage/index"
//         options={{
//           title: "Home",
//           // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explorepage/index"
//         options={{
//           title: "Explore",
//           // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="communitypage/index"
//         options={{
//           title: "Community",
//           // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profilepage/index"
//         options={{
//           title: "Profile",
//           // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }


import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="homepage/index"
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
      backBehavior="history"
    >
      <Tabs.Screen
        name="homepage/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messagepage/index"
        options={{
          title: "Messages",
          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="searchpage/index"
        options={{
          title: "Search",
          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profilepage/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name={focused ? "user-alt" : "user-alt"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
