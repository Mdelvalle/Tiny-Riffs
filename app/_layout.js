import { FONT } from '@constants/theme';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const [fontsLoaded, fontsError] = useFonts(FONT.asset);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    if (fontsError) {
      console.log('Error: Loading fonts failed', fontsError);
    }
  }, [fontsLoaded, fontsError]);

  return fontsLoaded && <Slot />;
};

export default AppLayout;
