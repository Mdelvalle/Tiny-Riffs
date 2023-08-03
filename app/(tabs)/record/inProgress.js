import RecordButton from '@components/record/RecordButton';
import { FONT } from '@constants/theme';
import record from '@styles/record';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RecordingInProgress = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const recordingRef = useRef(null);

  useEffect(() => {
    startRecording();
  }, []);

  useEffect(() => {
    console.log(`> Recording has ${isRecording ? 'started' : 'ended'}.`);
  }, [isRecording]);

  useEffect(() => {
    // Update elapsed time every second while recording
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleRecordButtonPress = () => {
    stopRecording();
  };

  const startRecording = async () => {
    try {
      const newRecording = new Audio.Recording();
      console.log('Starting recording..');
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      await newRecording.startAsync();
      recordingRef.current = newRecording;
    } catch (err) {
      console.error('Failed to START recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (recordingRef.current) {
        console.log('Stopping recording..');
        await recordingRef.current.stopAndUnloadAsync();
        const recordingUri = recordingRef.current.getURI();
        console.log('recordingUri', recordingUri);
        setIsRecording(false);
        setElapsedTime(0);

        // router.push('/record/review', { recordingUri });
        // router.push('/record/review', {
        //   recordingUri: recordingUri,
        // });
      }
    } catch (error) {
      console.error('Failed to STOP recording', error);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={record.container}>
      <Text style={styles.elapsedTime}>{formatTime(elapsedTime)}</Text>
      <RecordButton
        recording={true}
        onPress={() => handleRecordButtonPress()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  elapsedTime: {
    color: 'white',
    fontFamily: FONT.family,
    fontSize: 72,
  },
});

export default RecordingInProgress;
