import { rV } from "@/src/lib/responsivehandler";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const CELL_COUNT = 4;
const { width } = Dimensions.get("window");

const OtpPin = ({ value, setValue }: Props) => {
  const navigation = useNavigation();
  const [isFull, setIsFull] = React.useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleFulfill = (code: any) => {
    if (code?.length === CELL_COUNT) {
      setIsFull(true);
      setValue(code);
      // navigation.navigate("ConfirmPin");
    }
  };

  // Calculate responsive cell width based on screen width
  const cellWidth = Math.min((width - 80) / CELL_COUNT - 8, 70);

  return (
    <View style={styles.container}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        secureTextEntry={true}
        onChangeText={(code) => {
          setValue(code);
          handleFulfill(code);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[
              styles.cellContainer,
              { width: cellWidth },
              isFocused && styles.focusCell,
            ]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={[styles.cellText, { fontSize: cellWidth * 0.4 }]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  codeFiledRoot: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cellContainer: {
    height: rV(60),
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 20,
    backgroundColor: "#F4FAF6",
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontFamily: "PoppinsMedium",
    color: "#000000",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  focusCell: {
    borderColor: "#5DA96A",
    borderWidth: 2,
  },
});

export default OtpPin;
