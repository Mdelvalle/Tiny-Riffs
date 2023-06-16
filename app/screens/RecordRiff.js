import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import TimeSignatureButton from '../components/TimeSignatureButton';
import TimesToLoop from '../components/TimesToLoop';
import RecordButton from '../components/RecordButton';


const RecordRiff = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const [recording, setRecording] = useState(false);

  const handleTimeSignatureButtonPress = (button) => {
    setSelectedButton(button);
  };

  const handleRecordButtonPress = () => {
    setRecording(!recording);
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
      <RecordButton
        recording={recording}
        onPress={() => handleRecordButtonPress()}
      />
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
  mb: {
    marginBottom: 24,
  },
});

export default RecordRiff;
