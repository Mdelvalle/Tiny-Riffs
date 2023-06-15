import { Pressable, StyleSheet, Text, View } from 'react-native';
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

const TimesToLoop = ({onPress}) => {
  return (
    <View style={loopStyles.container}>
      <Pressable>
        <Text style={[loopStyles.multiplier, loopStyles.divider]}>x1</Text>
      </Pressable>
      <Pressable>
        <Text style={[loopStyles.multiplier, loopStyles.divider]}>x2</Text>
      </Pressable>
      <Pressable>
        <Text style={[loopStyles.multiplier, loopStyles.divider]}>x3</Text>
      </Pressable>
      <Pressable>
        <Text style={loopStyles.multiplier}>x4</Text>
      </Pressable>
    </View>
  );
};
const loopStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-evenly',
    width: 192,
  },
  divider: {
    borderColor: 'white',
    borderRightWidth: 1,
    paddingRight: 9,
  },
  multiplier: {
    color: 'white',
    fontSize: 24,
  }
});

const RecordButton = ({onPress}) => {
  return (
    <Pressable
      style={recordStyles.recordButton}
      onPress={onPress}
    >
      <View style={recordStyles.recordButtonInner}></View>
    </Pressable>
  );
};

const recordStyles = StyleSheet.create({
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
})

export default function RecordRiff() {
  const [selectedButton, setSelectedButton] = useState('');

  const handleTimeSignatureButtonPress = (button) => {
    setSelectedButton(button);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={[styles.timeSignaturesRow, styles.mb]}>
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
        <View style={styles.timeSignaturesRow}>
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
      <TimesToLoop />
      <RecordButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 24,
  },
  timeSignaturesRow: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
  },
  mb: {
    marginBottom: 24,
  },
  mr: {
    marginRight: 24,
  },
  selectedButton: {
    borderColor: 'green',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  selectedText: {
    color: 'green',
  },
});
