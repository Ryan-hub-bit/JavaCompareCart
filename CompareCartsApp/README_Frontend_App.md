# App/Frontend Documentation

This guide will help you get the CompareCarts app emulated on your computer.

## Requirements

- Install React Native. Easiest way to do so is by using the Expo CLI.
  
   - Install Node 10 LTS [here](https://nodejs.org/en/download/)
   - Install Expo CLI

       ```
       npm install -g expo-cli
       ```
- Install Android Studio [here](https://developer.android.com/studio)
    
   - Start Android Studio > Configure (bottom right) > AVD manager > Create Virtual Device > Choose a phone (I am using Pixel 3a) and wait for it to install (can take awhile because it's like 8-10 GB)
   - Once virtual device has been created, go to AVD manager and press the play button in "actions" to start running an emulated phone.

## Installation of Project Dependencies

1. Git clone this repository
2. cd into this folder
3. Install the required modules in package.json
    ```
    npm install 
    ```

## Emulating the App

1. cd into this folder
2. Run: 
    ```
    expo start
    ```
3. Wait for browser to pop up
4. CLI will prompt you for type of emulation. Type 'a' for android device.
5. App should appear on the emulated phone

## Questions?

Reach out to Travis Chan (tchan30@jhu.edu)
