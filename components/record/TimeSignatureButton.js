import { COLOR, FONT, SIZE } from '@constants/theme';
import { Pressable, StyleSheet, Text } from 'react-native';

const TimeSignatureButton = ({ top, bottom, selected, onPress, isFirst }) => {
  return (
    <Pressable
      style={[
        styles.button,
        selected && styles.selectedButton,
        isFirst && styles.mr,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, selected && styles.selectedText]}>
        {`${top}/${bottom}`}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLOR.light,
    justifyContent: 'center',
  },
  selectedButton: {
    borderColor: COLOR.primary,
  },
  mr: {
    marginRight: SIZE.lg,
  },
  selectedText: {
    color: COLOR.primary,
  },
  text: {
    fontFamily: FONT.family,
    color: COLOR.light,
    fontSize: SIZE.lg,
  },
});

export default TimeSignatureButton;
