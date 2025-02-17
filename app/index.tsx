import { initializeUpdateTask } from "@/src/backgroundTask";
import { checkForUpdates } from "@/src/updates";
import { Button, Text, View } from "react-native";

// initializeUpdateTask();

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ backgroundColor: "lightblue", width: 150, height: 25 }} />
      <Text>Testing Expo Updates using BG Tasks</Text>
      <Button
        title="Check for updates"
        onPress={() => {
          checkForUpdates();
        }}
      />
    </View>
  );
}
