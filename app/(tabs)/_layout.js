import { COLOR, FONT, SIZE } from '@constants/theme';
import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: null,
        tabBarLabelStyle: {
          fontFamily: FONT.family,
          fontSize: SIZE.lg,
          textTransform: 'uppercase',
        },
        tabBarInactiveBackgroundColor: COLOR.dark,
        tabBarActiveBackgroundColor: COLOR.dark,
        tabBarActiveTintColor: COLOR.primary,
        tabBarInactiveTintColor: COLOR.light,
      }}>
      <Tabs.Screen name="riffs" options={{ headerShown: false }} />
      <Tabs.Screen name="record" options={{ headerShown: false }} />
      <Tabs.Screen name="loops" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;
