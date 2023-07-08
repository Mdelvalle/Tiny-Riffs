import RecordButton from '@components/record/RecordButton';
import TimeSignatureButton from '@components/record/TimeSignatureButton';
import TimesToLoop from '@components/record/TimesToLoop';
import { COLOR, SIZE } from '@constants/theme';
import { Audio } from 'expo-av';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Record() {
  const [selectedButton, setSelectedButton] = useState('');
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState(false);

  useEffect(() => {
    console.log(`> Recording has ${recording ? 'started' : 'ended'}.`);
  }, [recording]);

  useEffect(() => {
    async function getPermission() {
      try {
        const permission = await Audio.requestPermissionsAsync();
        console.log('Permission Granted', permission.granted);
      } catch (error) {
        console.log(error);
      }
    }

    getPermission();

    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  const handleTimeSignatureButtonPress = (button) => {
    setSelectedButton(button);
  };

  async function startRecording() {
    try {
      const newRecording = new Audio.Recording();
      console.log('Starting recording..');
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus('recording');
    } catch (err) {
      console.error('Failed to START recording', err);
    }
  }

  async function stopRecording() {
    try {
      if (recordingStatus === 'recording') {
        console.log('Stopping recording..');
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();

        // Name the new recording file
        // const fileName = `tR-${Date.now()}.mp3`;

        // Save the file

        // Play the file
        const playbackObject = new Audio.Sound();
        await playbackObject.loadAsync({
          uri: recordingUri,
        });
        await playbackObject.playAsync();

        // Update recording state
        setRecording(null);
        setRecordingStatus('stopped');

        return recordingUri;
      }
    } catch (error) {
      console.error('Failed to STOP recording', error);
    }
  }

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording();
      if (audioUri) {
        console.log('Saved the file to', audioUri);
      }
    } else {
      await startRecording();
    }
  }

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
        recording={Boolean(recording)}
        onPress={() => handleRecordButtonPress()}
      />
    </SafeAreaView>
  );
}

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
