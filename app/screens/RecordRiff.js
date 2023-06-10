import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from 'react';


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

export default function RecordRiff() {
  const [selectedButton, setSelectedButton] = useState('');

  const handleTimeSignatureButtonPress = (button) => {
    setSelectedButton(button);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.timeSignatures, styles.mb]}>
        <TimeSignatureButton
          top={2}
          bottom={4}
          selected={selectedButton === '1'}
          onPress={() => handleTimeSignatureButtonPress('1')}
          isFirst
        />
        <TimeSignatureButton
          top={3}
          bottom={4}
          selected={selectedButton === '2'}
          onPress={() => handleTimeSignatureButtonPress('2')}
        />
      </View>
      <View style={styles.timeSignatures}>
        <TimeSignatureButton
          top={6}
          bottom={8}
          selected={selectedButton === '3'}
          onPress={() => handleTimeSignatureButtonPress('3')}
          style={[styles.mr]}
          isFirst
        />
        <TimeSignatureButton
          top={4}
          bottom={4}
          selected={selectedButton === '4'}
          onPress={() => handleTimeSignatureButtonPress('4')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: 24,
  },
  timeSignatures: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    width: 72,
    height: 72,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
  },
  mb: {
    marginBottom: 12,
  },
  mr: {
    marginRight: 12,
  },
  selectedButton: {
    borderColor: 'green',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'green',
  },
});
