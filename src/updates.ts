import { appendTaskLog } from "@/src/storage";
import * as Updates from "expo-updates";
import { Alert } from "react-native";

/**
 * Check for updates in the Expo project.
 */
export const checkForUpdates = async () => {
  try {
    appendTaskLog("Checking for updates...");
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      Alert.alert(
        "Update available",
        `An update is available. ${update.manifest.id}. Do you want to apply this update?`,
        [
          {
            onPress: () => {
              appendTaskLog("Applying update...");
              try {
                Updates.fetchUpdateAsync().then(() => {
                  appendTaskLog("Reloading app...");
                  Updates.reloadAsync();
                });
              } catch (e) {
                appendTaskLog("There was an error updating the app: " + e);
              }
            },
            text: "OK",
            style: "default",
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    } else {
      alert("No updates available.");
      appendTaskLog("No updates available.");
    }
  } catch (error) {
    // You can also add an alert() to see the error message in case of an error when fetching updates.
    alert(`Error fetching latest Expo update: ${error}`);
    appendTaskLog(`Error fetching latest Expo update: ${error}`);
  }
};
