import * as Updates from "expo-updates";

/**
 * Check for updates in the Expo project.
 */
export const checkForUpdates = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      alert(`An update is available. ${update.manifest.id}`);
    } else {
      alert("No updates available.");
    }
  } catch (error) {
    // You can also add an alert() to see the error message in case of an error when fetching updates.
    alert(`Error fetching latest Expo update: ${error}`);
  }
};
