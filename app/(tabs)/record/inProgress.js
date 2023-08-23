import { RecordButton } from '@components/atoms/ActionButtons';
import { FONT } from '@constants/theme';
import record from '@styles/record';
import { Audio } from 'expo-av';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AUDIO_RECORDING_DIR =
  'file:///data/user/0/com.valleyWare.tinyRiffs/cache/Audio/';

const RecordingInProgress = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recording, setRecording] = useState(null);
  const router = useRouter();
  const navigation = useNavigation();

  /**
   * Initial calls
   */
  useEffect(() => {
    // Initialize and start recording
    (async () => {
      try {
        const newRecording = new Audio.Recording();

        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });
        await newRecording.prepareToRecordAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY,
        );
        await newRecording.startAsync();
        setRecording(() => newRecording);
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    })();

    // Update elapsed time every second while recording
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    // Clean up
    return () => {
      clearInterval(timer);
    };
  }, []);

  /**
   * Make sure to update listener when
   * recording or navigation changes
   */
  useEffect(() => {
    const beforeRemoveListener = navigation.addListener(
      'beforeRemove',
      handleBeforeRemove,
    );

    return () => {
      // unload navigation listener
      beforeRemoveListener();
    };
  }, [recording]);

  /**
   * Stop recording if user navigates away from
   * screen while recording is still in progress
   */
  const handleBeforeRemove = async (e) => {
    e.preventDefault();

    try {
      // unload recording
      const { isRecording } = await recording?.getStatusAsync();
      if (isRecording) {
        await recording.stopAndUnloadAsync();
      }
    } catch (error) {
      console.log('something failed when switching screens', error);
    }

    navigation.dispatch(e.data.action);
  };

  /**
   * Record button handling
   * Recording in progress is initial state
   * Pressing button stops recording
   */
  const handleRecordButtonPress = () => {
    stopRecording();
  };

  /**
   * Stops current recording and sends
   * recording id to review screen
   */
  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        const recordingId = recordingUri?.split(AUDIO_RECORDING_DIR)[1];
        setRecording(null);

        router.replace({
          pathname: '/record/review',
          params: {
            recordingId,
          },
        });
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  /**
   * Takes time in seconds and makes it pretty
   * 00:00
   */
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
