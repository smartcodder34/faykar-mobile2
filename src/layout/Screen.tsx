// import React from "react";
// import {
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import type { Edge } from "react-native-safe-area-context";
// import SafeScreen from "../components/SafeScreen";

// type ScreenProps = {
//   children: React.ReactNode;
//   edges?: Edge[];
//   scroll?: boolean;
//   className?: string;
//   contentClassName?: string;
//   keyboardAware?: boolean; // Enable keyboard avoiding behavior
//   dismissKeyboardOnTap?: boolean; // Dismiss keyboard when tapping outside
//   keyboardOffset?: number; // Custom offset for KeyboardAvoidingView
//   scrollEnabled?: boolean; // Control scroll behavior
//   showsVerticalScrollIndicator?: boolean;
//   bounces?: boolean;
// };

// export default function Screen({
//   children,
//   edges = ["top", "left", "right"],
//   scroll = false,
//   className,
//   contentClassName,
//   keyboardAware = true,
//   dismissKeyboardOnTap = true,
//   keyboardOffset = 0,
//   scrollEnabled = true,
//   showsVerticalScrollIndicator = true,
//   bounces = true,
// }: ScreenProps) {
//   const renderContent = () => {
//     if (scroll) {
//       return (
//         <ScrollView
//           className="flex-1"
//           keyboardShouldPersistTaps="handled"
//           scrollEnabled={scrollEnabled}
//           showsVerticalScrollIndicator={showsVerticalScrollIndicator}
//           bounces={bounces}
//           contentContainerStyle={{ flexGrow: 1 }}
//           contentContainerClassName={["flex-grow", contentClassName]
//             .filter(Boolean)
//             .join(" ")}
//         >
//           {children}
//         </ScrollView>
//       );
//     }

//     return (
//       <View className={["flex-1", contentClassName].filter(Boolean).join(" ")}>
//         {children}
//       </View>
//     );
//   };

//   const renderWithKeyboardHandling = () => {
//     if (keyboardAware) {
//       return (
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           keyboardVerticalOffset={keyboardOffset}
//         >
//           {renderContent()}
//         </KeyboardAvoidingView>
//       );
//     }

//     return renderContent();
//   };

//   const renderWithDismissKeyboard = () => {
//     if (dismissKeyboardOnTap) {
//       return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <View style={{ flex: 1 }}>{renderWithKeyboardHandling()}</View>
//         </TouchableWithoutFeedback>
//       );
//     }

//     return renderWithKeyboardHandling();
//   };

//   return (
//     <SafeScreen
//       edges={edges}
//       className={["bg-background", className].filter(Boolean).join(" ")}
//     >
//       {renderWithDismissKeyboard()}
//     </SafeScreen>
//   );
// }

import React, { useMemo, memo } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Edge } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";

type ScreenProps = {
  children: React.ReactNode;
  edges?: Edge[];
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
  keyboardAware?: boolean;
  dismissKeyboardOnTap?: boolean;
  keyboardOffset?: number;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  bounces?: boolean;
  bottomOffset?: number;
};

const OptimizedScrollView = memo(
  ({
    children,
    scrollEnabled,
    showsVerticalScrollIndicator,
    bounces,
    contentContainerStyle,
    contentContainerClassName,
  }: any) => (
    <ScrollView
      className="flex-1"
      keyboardShouldPersistTaps="handled"
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      bounces={bounces}
      contentContainerStyle={contentContainerStyle}
      contentContainerClassName={contentContainerClassName}
      removeClippedSubviews={true}
      {...{
        initialNumToRender: 10,
        maxToRenderPerBatch: 10,
        windowSize: 5,
        updateCellsBatchingPeriod: 50,
      }}
    >
      {children}
    </ScrollView>
  )
);

OptimizedScrollView.displayName = "OptimizedScrollView";

export default function Screen({
  children,
  edges = ["top", "left", "right"],
  scroll = false,
  className = "",
  contentClassName = "",
  keyboardAware = true,
  dismissKeyboardOnTap = true,
  keyboardOffset,
  scrollEnabled = true,
  showsVerticalScrollIndicator = false,
  bounces = true,
  bottomOffset = 20,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const resolvedKeyboardOffset =
    keyboardOffset ?? Platform.select({ ios: insets.top, android: 0 }) ?? 0;
  const containerClasses = useMemo(
    () => ["bg-white", className].filter(Boolean).join(" "),
    [className],
  );

  const innerClasses = useMemo(
    () => ["flex-grow", contentClassName].filter(Boolean).join(" "),
    [contentClassName],
  );

  const contentContainerStyle = useMemo(
    () => ({
      flexGrow: 1,
      paddingBottom: bottomOffset,
    }),
    [bottomOffset],
  );

  const renderContent = () => {
    if (scroll) {
      return (
        <OptimizedScrollView
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          bounces={bounces}
          contentContainerStyle={contentContainerStyle}
          contentContainerClassName={innerClasses}
        >
          {children}
        </OptimizedScrollView>
      );
    }

    return <View className={`flex-1 ${contentClassName}`}>{children}</View>;
  };

  const renderWithKeyboardHandling = () => {
    if (!keyboardAware) {
      return renderContent();
    }

    return (
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={resolvedKeyboardOffset}
      >
        {renderContent()}
      </KeyboardAvoidingView>
    );
  };

  const content = renderWithKeyboardHandling();

  if (!dismissKeyboardOnTap || !keyboardAware) {
    return (
      <SafeScreen edges={edges} className={containerClasses}>
        {content}
      </SafeScreen>
    );
  }

  return (
    <SafeScreen edges={edges} className={containerClasses}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.flex}>{content}</View>
      </TouchableWithoutFeedback>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
