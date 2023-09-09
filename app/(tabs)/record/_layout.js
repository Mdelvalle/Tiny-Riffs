import { Stack } from 'expo-router';
import React from 'react';

const RecordLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="setup" options={{ headerShown: false }} />
      <Stack.Screen name="inProgress" options={{ headerShown: false }} />
      <Stack.Screen name="review" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RecordLayout;
