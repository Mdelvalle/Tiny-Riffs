import { MaterialIcons } from '@expo/vector-icons';
import record from '@styles/record';
import { Audio } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const AUDIO_RECORDING_DIR =
  'file:///data/user/0/com.valleyWare.tinyRiffs/cache/Audio/';

const RecordingReview = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [soundPosition, setSoundPosition] = useState(0);
  const [recordingName, setRecordingName] = useState('');
  const { recordingId } = useLocalSearchParams();
  const recordingUri = `${AUDIO_RECORDING_DIR}${recordingId}`;

  useEffect(() => {
    (async () => {
      try {
        const newSound = new Audio.Sound();
        await newSound.loadAsync({ uri: recordingUri });
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setSound(() => newSound);
      } catch (error) {
        console.log('Error loading recording:', error);
      }
    })();
  }, []);

  useEffect(() => {
    return async () => {
      if (sound) {
        try {
          await sound.stopAsync();
          await sound.unloadAsync();
        } catch (error) {
          console.log('Error stopping or unloading sound:', error);
        }
      }
    };
  }, [sound]);

  const handleSaveRecording = () => {
    // Save the recording with the given name
    console.log(`Recording saved with name: ${recordingName}`);
  };

  const handleDiscardRecording = () => {
    // Discard the recording
    console.log('Recording discarded');
  };

  const handlePlayback = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          const paused = await sound.pauseAsync();
          setSoundPosition(paused.positionMillis);
          setIsPlaying(false);
        } else {
          await sound.setPositionAsync(soundPosition);
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.log('Error handling playback:', error);
    }
  };

  const handleLoopSound = async () => {
    if (sound) {
      try {
        await sound.setIsLoopingAsync(!isLooping);
        setIsLooping(() => !isLooping);
      } catch (error) {
        console.log('Error looping sound:', error);
      }
    }
  };

  const onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      setSoundPosition(0);
      setIsPlaying(playbackStatus.isLooping);
    }
  };

  const ActionIconButton = ({ onPress, name, size, color }) => {
    return (
      <Pressable onPress={onPress}>
        <MaterialIcons name={name} size={size} color={color} />
      </Pressable>
    );
  };

  const PlayPauseButton = ({ onPress }) => {
    const playPauseIconName = isPlaying
      ? 'pause-circle-outline'
      : 'play-circle-outline';

    return (
      <ActionIconButton
        name={playPauseIconName}
        size={108}
        color={'white'}
        onPress={onPress}
      />
    );
  };

  const DiscardSoundButton = ({ onPress }) => {
    return (
      <ActionIconButton
        name="cancel"
        size={72}
        color="white"
        onPress={onPress}
      />
    );
  };

  const ConfirmSoundButton = ({ onPress }) => {
    return (
      <ActionIconButton
        name={'check-circle'}
        size={72}
        color={'white'}
        onPress={onPress}
      />
    );
  };

  const LoopSoundButton = ({ onPress }) => {
    return (
      <ActionIconButton
        name={'loop'}
        size={36}
        color={'white'}
        onPress={onPress}
      />
    );
  };

  return (
    <View style={[record.container, styles.review]}>
      <View style={styles.primaryControls}>
        <DiscardSoundButton onPress={() => handleDiscardRecording()} />
        <PlayPauseButton onPress={() => handlePlayback()} />
        <ConfirmSoundButton onPress={() => handleSaveRecording()} />
      </View>
      <View style={styles.secondaryControls}>
        <LoopSoundButton onPress={() => handleLoopSound()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  review: {
    justifyContent: 'flex-end',
  },
  primaryControls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secondaryControls: {
    marginTop: 36,
  },
});

export default RecordingReview;
