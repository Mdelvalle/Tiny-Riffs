import record from '@styles/record';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const RecordingReview = ({ route }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingName, setRecordingName] = useState('');
  const router = useRouter();
  const { recordingUri: recordedAudioURI } = router.params;
  console.log('recordedAudioURI', recordedAudioURI);

  // Get the recorded audio URI from the route params
  // const { recordedAudioURI } = params;

  useEffect(() => {
    // Make sure the audio playback is stopped when leaving the screen
    return () => {
      stopPlayback();
    };
  }, []);

  const handlePlayback = async () => {
    if (isPlaying) {
      // Pause playback
      await Audio.setIsEnabledAsync(false);
      setIsPlaying(false);
    } else {
      // Start playback
      await Audio.setIsEnabledAsync(true);
      await playRecording();
    }
  };

  const playRecording = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: recordedAudioURI });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setIsPlaying(true);
    } catch (error) {
      console.log('Error playing recording:', error);
    }
  };

  const stopPlayback = async () => {
    try {
      await Audio.setIsEnabledAsync(false);
      setIsPlaying(false);
    } catch (error) {
      console.log('Error stopping playback:', error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      // Playback has finished, stop the playback
      stopPlayback();
    }
  };

  const handleSaveRecording = () => {
    // Save the recording with the given name
    console.log(`Recording saved with name: ${recordingName}`);
  };

  const handleDiscardRecording = () => {
    // Discard the recording
    console.log('Recording discarded');
  };

  return (
    <View style={record.container}>
      {/* <StatusBar style="light" backgroundColor="black"></StatusBar> */}
      <Text>RecordingReview</Text>
    </View>
  );
};

export default RecordingReview;
