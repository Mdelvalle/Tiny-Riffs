import { COLOR } from '@constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Loops = () => {
  return (
    <View style={styles.container}>
      <Text>Loops</Text>
    </View>
  );
};

export default Loops;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
