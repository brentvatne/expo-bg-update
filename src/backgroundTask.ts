import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import * as Updates from "expo-updates";

import { appendTaskLog } from "@/src/storage";

const BACKGROUND_TASK_NAME = "task-run-expo-update";

/**
 * Initialize the expo update background task
 */
export const initializeUpdateTask = async () => {
  appendTaskLog(`Defining task "${BACKGROUND_TASK_NAME}"`);
  await TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
    // This is the background task!
    await appendTaskLog("Running background task...");

    await appendTaskLog("Looking for updates...");
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await appendTaskLog("Update available. Fetching update...");
      await Updates.fetchUpdateAsync();
      await appendTaskLog("Done fetching update.");
      await appendTaskLog("Reloading app...");
      await Updates.reloadAsync();
      await appendTaskLog("Done reloading app.");
    }

    await appendTaskLog("Done running background task.");

    return Promise.resolve();
  });
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_TASK_NAME
  );
  if (!isRegistered) {
    appendTaskLog(`Registering task "${BACKGROUND_TASK_NAME}"`);
    await BackgroundTask.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 15,
    });
    appendTaskLog(`"${BACKGROUND_TASK_NAME}" registered.`);
  } else {
    appendTaskLog(`Task "${BACKGROUND_TASK_NAME}" already registered.`);
  }
};
