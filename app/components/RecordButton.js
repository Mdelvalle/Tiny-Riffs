import { Pressable, StyleSheet, View } from 'react-native';


const RecordButton = ({onPress}) => {
  return (
    <Pressable
      style={styles.recordButton}
      onPress={onPress}
    >
      <View style={styles.recordButtonInner}></View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  recordButton: {
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
  },
  recordButtonInner: {
    backgroundColor: "white",
    width: 36,
    height: 36,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
  },
});

export default RecordButton;
