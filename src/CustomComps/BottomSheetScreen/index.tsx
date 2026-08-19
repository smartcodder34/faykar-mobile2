import RBSheet from "@lunalee/react-native-raw-bottom-sheet";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, Keyboard, Platform, ScrollView } from "react-native";

export type BottomSheetScreenRef = {
  expand: () => void;
  close: () => void;
};

type BottomSheetScreenProps = {
  message: React.ReactNode;
  snapPoints?: (number | string)[];
  index?: number;
  isBackdropComponent?: boolean;
  enablePanDownToClose?: boolean;
  pressBehavior?: "none" | "close" | "collapse";
  keyboardAvoidingViewEnabled?: boolean;
};

function getSheetHeight(snapPoints?: (number | string)[]): number {
  if (!snapPoints || snapPoints.length === 0) return 260;
  const last = snapPoints[snapPoints.length - 1];
  if (typeof last === "string" && last.endsWith("%")) {
    return Math.round(
      (parseFloat(last) / 100) * Dimensions.get("window").height,
    );
  }
  return typeof last === "number" ? last : 260;
}

const BottomSheetScreen = React.forwardRef<
  BottomSheetScreenRef,
  BottomSheetScreenProps
>(
  (
    {
      message,
      snapPoints,
      isBackdropComponent,
      enablePanDownToClose,
      pressBehavior = "close",
      keyboardAvoidingViewEnabled = true,
    },
    ref,
  ) => {
    const rbSheetRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      expand: () => rbSheetRef.current?.open(),
      close: () => rbSheetRef.current?.close(),
    }));

    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
      const show = Keyboard.addListener("keyboardDidShow", (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      });
      const hide = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardHeight(0);
      });
      return () => {
        show.remove();
        hide.remove();
      };
    }, []);

    const baseHeight = getSheetHeight(snapPoints);
    const adjustedHeight =
      Platform.OS === "android" && keyboardHeight > 0
        ? Math.max(baseHeight - keyboardHeight, 200)
        : baseHeight;
    const closeOnPressMask =
      isBackdropComponent !== false && pressBehavior !== "none";

    return (
      <RBSheet
        ref={rbSheetRef}
        height={adjustedHeight}
        closeOnDragDown={enablePanDownToClose}
        closeOnPressMask={closeOnPressMask}
        animationType="none"
        keyboardAvoidingViewEnabled={keyboardAvoidingViewEnabled}
        customStyles={{
          wrapper: {
            backgroundColor: isBackdropComponent ? undefined : "transparent",
          },
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {message}
        </ScrollView>
      </RBSheet>
    );
  },
);

BottomSheetScreen.displayName = "BottomSheetScreen";

export default BottomSheetScreen;
