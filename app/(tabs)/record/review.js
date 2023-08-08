import { MaterialIcons } from '@expo/vector-icons';
import record from '@styles/record';
import { Audio } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const AUDIO_RECORDING_DIR =
  'file:///data/user/0/com.valleyWare.tinyRiffs/cache/Audio/';

const RecordingReview = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingName, setRecordingName] = useState('');
  const { recordingId } = useLocalSearchParams();
  const recordingUri = `${AUDIO_RECORDING_DIR}${recordingId}`;

  useEffect(() => {
    const loadRecording = async () => {
      try {
        const newSound = new Audio.Sound();
        await newSound.loadAsync({ uri: recordingUri });
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setSound(newSound);
      } catch (error) {
        console.log('Error loading recording:', error);
      }
    };

    loadRecording();
  }, []);

  const handlePlayback = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.log('Error handling playback:', error);
    }
  };

  const onPlaybackStatusUpdate = (playbackStatus) => {
    console.log('playbackStatus', playbackStatus);

    // in review -> play -> let it finish -> button changes to triangle -> play -> nothing
    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      setIsPlaying(false);
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

  const ActionIconButton = ({ onPress, name, size, color }) => {
    return (
      <Pressable onPress={onPress}>
        <MaterialIcons name={name} size={size} color={color} />
      </Pressable>
    );
  };

  const PlayPauseButton = ({ onPress, color }) => {
    const iconName = isPlaying ? 'pause-circle-outline' : 'play-circle-outline';

    return (
      <ActionIconButton
        name={iconName}
        size={108}
        color={color}
        onPress={onPress}
      />
    );
  };

  return (
    <View style={record.container}>
      <View style={{ width: '100%' }}>
        <TextInput
          style={styles.nameInput}
          underlineColorAndroid={'purple'}
          onChangeText={(t) => setRecordingName(t)}
          value={recordingName}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            paddingLeft: 36,
            paddingRight: 36,
          }}>
          <ActionIconButton
            name="cancel"
            size={72}
            color="white"
            onPress={() => handleDiscardRecording()}
          />
          <ActionIconButton
            name={'check-circle'}
            size={72}
            color={'white'}
            onPress={() => handleSaveRecording()}
          />
        </View>
      </View>
      <View>
        <PlayPauseButton color="white" onPress={() => handlePlayback()} />
      </View>
      <Text>RecordingReview</Text>
      <Text style={{ color: 'purple' }}>{recordingUri}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nameInput: {
    color: 'white',
    fontSize: 36,
  },
});

export default RecordingReview;
