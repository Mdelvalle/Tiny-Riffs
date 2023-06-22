import RecordButton from '@components/record/RecordButton';
import TimeSignatureButton from '@components/record/TimeSignatureButton';
import TimesToLoop from '@components/record/TimesToLoop';
import { COLOR, SIZE } from '@constants/theme';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Record = () => {
  const [selectedButton, setSelectedButton] = useState('');
  const [recording, setRecording] = useState(false);

  const handleTimeSignatureButtonPress = (button) => {
    setSelectedButton(button);
  };

  const handleRecordButtonPress = () => {
    setRecording(!recording);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="black"></StatusBar>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.dark,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: SIZE.lg,
    marginTop: Constants.statusBarHeight,
  },
  timeSignaturesRow: {
    flexDirection: 'row',
  },
  mb: {
    marginBottom: SIZE.lg,
  },
});

export default Record;
