import { FONT } from '@constants/theme';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';

const AppLayout = () => {
  const [fontsLoaded] = useFonts(FONT.asset);

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return <Slot />;
};

export default AppLayout;
