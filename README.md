# EL Cartona

## Setting up environment
You need to make sure that you followed the react native [setup guide of react native cli](https://facebook.github.io/react-native/docs/getting-started)

## Server Url
make sure you have the correct server base url
navigate to `App\Config\APIConfig` and make sure that `baseURL` is correct

## Run the app
Navigate to the cloned repo and download dependencies by running `npm install` or `yarn`
If you are on mac machine and planning to run on IOS navigate to the ios folder and run `pod install`

- Run android
in the root project folder run `react-native run-android`
- Run ios
in the root project folder run `react-native run-ios`

## Building Release
### Android 
Navigate to the android folder in the cloned repo and run the following commands
`./gradlew clean` followed by `./gradlew assembleRelease`

### IOS
Open the ios project in XCode and select Archive and produce an IPA which you can you use to upload to the App Store
