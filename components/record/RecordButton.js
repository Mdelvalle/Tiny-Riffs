import { COLOR } from '@constants/theme';
import { Pressable, StyleSheet, View } from 'react-native';

const RecordButton = ({ onPress, recording }) => {
  return (
    <Pressable
      style={[styles.recordButton, recording && styles.recordingOuter]}
      onPress={onPress}>
      <View
        style={
          recording ? styles.recordingInner : styles.recordButtonInner
        }></View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  recordButton: {
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLOR.light,
    justifyContent: 'center',
  },
  recordingOuter: {
    backgroundColor: COLOR.secondary,
  },
  recordButtonInner: {
    backgroundColor: COLOR.light,
    width: 36,
    height: 36,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLOR.light,
    justifyContent: 'center',
  },
  recordingInner: {
    backgroundColor: COLOR.light,
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLOR.light,
    justifyContent: 'center',
  },
});

export default RecordButton;
