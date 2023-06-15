import { Pressable, StyleSheet, Text } from 'react-native';


const TimeSignatureButton = ({top, bottom, selected, onPress, isFirst}) => {
  return (
    <Pressable
      style={[
        styles.button,
        selected && styles.selectedButton,
        isFirst && styles.mr
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {`${top}/${bottom}`}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({button: {
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
  },
  selectedButton: {
    borderColor: 'green',
  },
  mr: {
    marginRight: 24,
  },
  selectedText: {
    color: 'green',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export default TimeSignatureButton;