import { StyleSheet, Text, View } from 'react-native';

const RiffSettings = ({current}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.wheel}>*</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 108,
    justifyContent: 'space-around',
  },
  wheel: {
    color: 'white',
    fontSize: 36,
  }
});

export default RiffSettings;
