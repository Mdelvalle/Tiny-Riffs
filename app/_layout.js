import { Slot, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { FONT } from '@constants/theme';


const AppLayout = () => {
  const [fontsLoaded] = useFonts(FONT.asset);

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return <Slot />;
}

export default AppLayout;
