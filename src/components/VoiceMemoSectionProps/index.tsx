// import { Ionicons } from "@expo/vector-icons";
// import {
//     AudioModule,
//     RecordingPresets,
//     useAudioPlayer,
//     useAudioRecorder,
// } from "expo-audio";
// import {
//   ExpoSpeechRecognitionModule,

//   useSpeechRecognitionEvent,
// } from "expo-speech-recognition";
// import React, { useState } from "react";
// import { Text, TouchableOpacity, View } from "react-native";

// interface VoiceMemoSectionProps {
//   onFileReady: (uri: string | null) => void;
//   onSpeechDetected: (text: string) => void; // New prop to update the text field
// }

// export const VoiceMemoSection = ({
//   onFileReady,
//   onSpeechDetected,
// }: VoiceMemoSectionProps) => {
//   const [recordedUri, setRecordedUri] = useState<string | null>(null);

//   const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
//   const player = useAudioPlayer(recordedUri);

//   // Speech Recognition Hook
//   const { recognizing, transcript } = useSpeechRecognitionEvent({
//     lang: "en-US",
//     onResult: (event) => {
//       onSpeechDetected(event.results[0].transcript);
//     },
//   });

//   const toggleRecording = async () => {
//     try {
//       if (audioRecorder.isRecording) {
//         // STOP
//         await audioRecorder.stop();
//         ExpoSpeechRecognitionModule.stop(); // Stop transcription
//         setRecordedUri(audioRecorder.uri);
//         onFileReady(audioRecorder.uri);
//       } else {
//         // START
//         const audioStatus = await AudioModule.requestPermissionsAsync();
//         const speechStatus =
//           await ExpoSpeechRecognitionModule.requestPermissionsAsync();

//         if (audioStatus.granted && speechStatus.granted) {
//           // Start Audio File Recording
//           await audioRecorder.prepareToRecordAsync();
//           audioRecorder.record();

//           // Start Speech-to-Text Transcription
//           ExpoSpeechRecognitionModule.start({
//             lang: "en-US",
//             interimResults: true, // Shows text as you speak
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Recording/Transcription error:", error);
//     }
//   };

//   const handlePlayPause = () => {
//     if (player.playing) player.pause();
//     else {
//       if (player.currentTime >= player.duration) player.seekTo(0);
//       player.play();
//     }
//   };

//   return (
//     <View className="flex-row items-center space-x-3">
//       {recordedUri && (
//         <View className="flex-row items-center bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
//           <TouchableOpacity
//             onPress={handlePlayPause}
//             className="flex-row items-center"
//           >
//             <Ionicons
//               name={player.playing ? "pause" : "play"}
//               size={16}
//               color="#2E6939"
//             />
//             <Text className="ml-1 text-[11px] font-[PoppinsMedium] text-primary">
//               Play Memo
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => {
//               setRecordedUri(null);
//               onFileReady(null);
//             }}
//             className="ml-2 pl-2 border-l border-primary/20"
//           >
//             <Ionicons name="close-circle" size={16} color="#ef4444" />
//           </TouchableOpacity>
//         </View>
//       )}

//       <TouchableOpacity
//         onPress={toggleRecording}
//         className={`flex-row items-center px-3 py-1.5 rounded-full ${audioRecorder.isRecording ? "bg-red-500" : "bg-primary/10"}`}
//       >
//         <Ionicons
//           name={audioRecorder.isRecording ? "stop" : "mic"}
//           size={16}
//           color={audioRecorder.isRecording ? "white" : "#2E6939"}
//         />
//         <Text
//           className={`ml-1 text-[11px] font-[PoppinsMedium] ${audioRecorder.isRecording ? "text-white" : "text-primary"}`}
//         >
//           {audioRecorder.isRecording ? "Listening..." : "Record Voice"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
