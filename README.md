# dm Weather-Mobile-App
This is the mobile app for the dm Weather App. It is written in React Native and uses Expo.

## How to use
Set environment variables:
```
EXPO_PUBLIC_BACKEND_SERVER_HOST=192.168.0.174
EXPO_PUBLIC_BACKEND_SERVER_PORT=8080
EXPO_PUBLIC_BACKEND_SERVER_URL=http://172.162.240.33/dm-weather-app-backend
EXPO_PUBLIC_WEATHER_DATA_PROVIDER=OpenWeather
EXPO_PUBLIC_WEATHER_DATA_PROVIDER_HOMEPAGE=https://openweathermap.org/
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_PUBLIC_LAST_RELEASE_DATE=06.02.2024
```
Install dependencies:
`npm install`

If this doesnt work make sure you have node.js and npm installed:
`node -v` or https://nodejs.org/en/download/current/


To start the app in development mode:
`expo start`

To run on ios or android download expo app and scan QR code in the terminal.


To end the development mode press `Ctrl + C`.