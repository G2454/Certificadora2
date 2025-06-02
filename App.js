import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './src/routes/Routes';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react'
import DMSansRegular from './assets/fonts/DMSans-Regular.ttf'
import DMSansSemiBold from './assets/fonts/DMSans-SemiBold.ttf'

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      DMSansRegular,
      DMSansSemiBold
    });
    setFontsLoaded(true);
  }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        loadFonts();
        if (!fontsLoaded) {
          return null;
        }
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        await SplashScreen.hideAsync()
      }
    }

    prepare();
  }, []);

  return (
<Routes />
  );
}
