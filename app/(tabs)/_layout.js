import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarIconStyle: null,
        tabBarLabelStyle: {
          fontFamily: 'Virgil',
          fontSize: 24,
          textTransform: 'uppercase'
        },
        tabBarInactiveBackgroundColor: 'black',
        tabBarActiveBackgroundColor: 'black',
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'white'
    }}>
      <Tabs.Screen name='riffs' options={{headerShown: false}} />
      <Tabs.Screen name='record' options={{headerShown: false}} />
      <Tabs.Screen name='loops' options={{headerShown: false}} />
    </Tabs>
  )
}

export default TabsLayout