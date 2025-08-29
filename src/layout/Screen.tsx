// import React from "react";
// import { ScrollView, View } from "react-native";
// import type { Edge } from "react-native-safe-area-context";
// import SafeScreen from "../components/SafeScreen";

// type ScreenProps = {
//   children: React.ReactNode;
//   edges?: Edge[];
//   scroll?: boolean;
//   className?: string;
//   contentClassName?: string;
// };

// export default function Screen({
//   children,
//   edges = ["top", "left", "right"],
//   scroll = false,
//   className,
//   contentClassName,
// }: ScreenProps) {
//   if (scroll) {
//     return (
//       <SafeScreen
//         edges={edges}
//         className={["bg-background", className].filter(Boolean).join(" ")}
//       >
//         <ScrollView
//           className="flex-1"
//           keyboardShouldPersistTaps="handled"
//           contentContainerStyle={{ flexGrow: 1 }}
//           contentContainerClassName={["flex-grow", contentClassName]
//             .filter(Boolean)
//             .join(" ")}
//         >
//           {children}
//         </ScrollView>
//       </SafeScreen>
//     );
//   }

//   return (
//     <SafeScreen
//       edges={edges}
//       className={["bg-background", className].filter(Boolean).join(" ")}
//     >
//       <View className={["flex-1", contentClassName].filter(Boolean).join(" ")}>
//         {children}
//       </View>
//     </SafeScreen>
//   );
// }


import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import type { Edge } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";

type ScreenProps = {
  children: React.ReactNode;
  edges?: Edge[];
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
  keyboardAware?: boolean; // Enable keyboard avoiding behavior
  dismissKeyboardOnTap?: boolean; // Dismiss keyboard when tapping outside
  keyboardOffset?: number; // Custom offset for KeyboardAvoidingView
  scrollEnabled?: boolean; // Control scroll behavior
  showsVerticalScrollIndicator?: boolean;
  bounces?: boolean;
};

export default function Screen({
  children,
  edges = ["top", "left", "right"],
  scroll = false,
  className,
  contentClassName,
  keyboardAware = true,
  dismissKeyboardOnTap = true,
  keyboardOffset = 0,
  scrollEnabled = true,
  showsVerticalScrollIndicator = true,
  bounces = true,
}: ScreenProps) {
  const renderContent = () => {
    if (scroll) {
      return (
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          bounces={bounces}
          contentContainerStyle={{ flexGrow: 1 }}
          contentContainerClassName={["flex-grow", contentClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </ScrollView>
      );
    }

    return (
      <View className={["flex-1", contentClassName].filter(Boolean).join(" ")}>
        {children}
      </View>
    );
  };

  const renderWithKeyboardHandling = () => {
    if (keyboardAware) {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={keyboardOffset}
        >
          {renderContent()}
        </KeyboardAvoidingView>
      );
    }

    return renderContent();
  };

  const renderWithDismissKeyboard = () => {
    if (dismissKeyboardOnTap) {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>{renderWithKeyboardHandling()}</View>
        </TouchableWithoutFeedback>
      );
    }

    return renderWithKeyboardHandling();
  };

  return (
    <SafeScreen
      edges={edges}
      className={["bg-background", className].filter(Boolean).join(" ")}
    >
      {renderWithDismissKeyboard()}
    </SafeScreen>
  );
}