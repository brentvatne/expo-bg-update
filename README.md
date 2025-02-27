# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Expo Updates

Create a new update:

`eas update --channel "development" --message "message here"`

## iOS - Run background task:

Remember to update `app.json` and the updates.platform field

run `npx expo prebuild -p ios --clean`

In XCode debugger, run the following command:

`e -l objc -- (void)[[BGTaskScheduler sharedScheduler] _simulateLaunchForTaskWithIdentifier:@"com.expo.modules.backgroundtask.processing"]`

## Android

Remember to update `app.json` and the updates.platform field

run `npx expo prebuild -p android --clean`

List jobs:
`adb shell dumpsys jobscheduler|grep "JOB #|grep ` plus your package name

Execute job:
`adb shell cmd jobscheduler run -f com.yourpackagename 999` <- job number
