import { Slot, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';


const AppLayout = () => {
  const [fontsLoaded] = useFonts({
    Virgil: require('@assets/fonts/Virgil.ttf'),
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return <Slot />;
}

export default AppLayout;
