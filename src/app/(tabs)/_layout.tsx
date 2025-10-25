import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabsLayout() {
  // Function to determine if tab bar should be hidden
  function getTabBarVisibility(route: any) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "index";

    // Hide tab bar for these specific routes
    const hiddenRoutes = [
      "chat-room",
     
    ];

    // Check if the current route or any part of it matches hidden routes
    const shouldHide = hiddenRoutes.some(
      (hiddenRoute) =>
        routeName.includes(hiddenRoute) ||
        route?.params?.screen?.includes(hiddenRoute)
    );

    return shouldHide;
  }
  return (
    <Tabs
      initialRouteName="homepage"
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
        name="homepage"
        // options={{
        //   title: "Home",
        //   tabBarIcon: ({ color, focused }) => (
        //     <Ionicons
        //       name={focused ? "home" : "home"}
        //       size={24}
        //       color={focused ? "#2E6939" : "#B8B4B4"}
        //     />
        //   ),
        // }}
        options={({ route }) => ({
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
          // Use the same tab bar visibility logic as homepage
          tabBarStyle: getTabBarVisibility(route)
            ? { display: "none" }
            : Platform.select({
                ios: {
                  position: "absolute",
                },
                default: {},
              }),
        })}
      />
      <Tabs.Screen
        name="messagepage/index"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="searchpage/index"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={focused ? "#2E6939" : "#B8B4B4"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profilepage"
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
