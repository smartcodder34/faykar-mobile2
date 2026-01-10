// // components/GradientText.tsx
// import MaskedView from "@react-native-masked-view/masked-view";
// import { LinearGradient } from "expo-linear-gradient";
// import { Text, TextProps } from "react-native";

// type GradientTextProps = TextProps & {
//   children: React.ReactNode;
//   gradientColors?: string[];
// };

// export const GradientText = ({
//   children,
//   gradientColors = ["#6A5E93", "#6D468E", "#732B87", "#913884", "#9D3D83"],
//   className,
//   style,
//   ...props
// }: GradientTextProps) => {
//   return (
//     <MaskedView
//       maskElement={
//         <Text className={className} style={style} {...props}>
//           {children}
//         </Text>
//       }
//     >
//       <LinearGradient
//         colors={gradientColors}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Text className={className} style={[style, { opacity: 0 }]} {...props}>
//           {children}
//         </Text>
//       </LinearGradient>
//     </MaskedView>
//   );
// };


import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TextProps } from "react-native";

type GradientTextProps = TextProps & {
  children: React.ReactNode;
  gradientColors?: string[];
};

export const GradientText = ({
  children,
  gradientColors = ["#5B4591", "#FF3E83"], // Purple to Pink - more contrast
  className,
  style,
  ...props
}: GradientTextProps) => {
  return (
    <MaskedView
      maskElement={
        <Text className={className} style={style} {...props}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text className={className} style={[style, { opacity: 0 }]} {...props}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};