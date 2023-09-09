import { FONT } from '@constants/theme';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  return (
    fontsLoaded && (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor="black"></StatusBar>
        <Slot />
      </SafeAreaView>
    )
  );
};

export default AppLayout;
