
// import OnBoardingSlider from "@/src/components/auth/OnBoardingSlider";
// import CustomButton from "@/src/CustomComps/CustomButton";
// import { useRouter } from "expo-router";
// import React from "react";
// import { View } from "react-native";


// const GetStartedScreen = () => {
//   const router = useRouter();

//   return (
//     <View className="flex-1">
//       {/* Slider Section with delayed fade-in */}
//       <View className="flex-[3] items-center justify-center">
//         <OnBoardingSlider />
//       </View>

//       {/* Button Section with slide-up animation */}
//       <View className="flex-1">
//         <View className="p-5 justify-center">
//           <View className="px-5 mt-10">
//             <CustomButton
//               primary
//               title="Create Account"
//               onPress={() => {
//                 // router.push({ pathname: "/guess-home" });
//               }}
//             />
//           </View>
//           <View className="my-5">
//             <CustomButton
//               whiteBg
//               title="Already Have an Account"
//               onPress={() => {
//                 // router.push({ pathname: "/login" });
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default GetStartedScreen;



import OnBoardingSlider from "@/src/components/auth/OnBoardingSlider";
import CustomButton from "@/src/CustomComps/CustomButton";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const GetStartedScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Slider Section */}
      <View className="flex-[4] items-center justify-center">
        <OnBoardingSlider />
      </View>

      {/* Button Section */}
      <View className="flex-1 justify-end">
        <View className="px-6 pb-10">
          {/* Create Account Button */}
          <View className="mb-4">
            <CustomButton
              rounded
              title="Create Account"
              onPress={() => {
                router.push( "/create-account" );
              }}
            />
          </View>

          {/* Already Have Account Button */}
          <View>
            <CustomButton
              whiteBg
              title="Already Have an Account"
              onPress={() => {
                router.push("/login" );
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default GetStartedScreen;