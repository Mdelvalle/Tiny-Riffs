import {
  ConfirmSoundButton,
  DiscardSoundButton,
  LoopSoundButton,
  PlayPauseButton,
} from '@components/atoms/ActionButtons';
import { COLOR, FONT } from '@constants/theme';
import record from '@styles/record';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const AUDIO_RECORDING_DIR =
  'file:///data/user/0/com.valleyWare.tinyRiffs/cache/Audio/';

const RecordingReview = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [soundPosition, setSoundPosition] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [recordingName, setRecordingName] = useState('');
  const { recordingId } = useLocalSearchParams();
  const recordingUri = `${AUDIO_RECORDING_DIR}${recordingId}`;
  const router = useRouter();

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
          console.log('unloading sound');
          await sound.unloadAsync();
        } catch (error) {
          console.log('Error stopping or unloading sound:', error);
        }
      }
    };
  }, [sound]);

  const toggleModal = () => {
    setRecordingName('');
    setModalVisible(!isModalVisible);
  };

  const handleSave = async () => {
    // TODO: NO IDEA WHERE IT'S SAVING ON THE PHONE
    // {FileSystem.documentDirectory} does not seem to be correct
    const tinyRiffsDir = 'TinyRiffs/';
    const newFilePath = `${FileSystem.documentDirectory}${tinyRiffsDir}${
      recordingName || recordingId
    }`;

    try {
      // await FileSystem.copyAsync({
      //   from: recordingUri,
      //   to: newFilePath,
      // });

      // Save the recording with the given name
      console.log('Recording saved to:', newFilePath);
    } catch (error) {
      console.error('Error saving recording:', error);
    }
  };

  const handleDiscard = () => {
    // Discard the recording
    router.replace('/record/setup');
    console.log('Discarding');
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

  const ModalButton = ({ text, onPress }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.modalButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress}>
        {({ pressed }) => (
          <Text
            style={[styles.buttonText, pressed && styles.buttonTextPressed]}>
            {text}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <View style={[record.container, styles.review]}>
      <View style={styles.secondaryControls}>
        <LoopSoundButton
          isLooping={isLooping}
          onPress={() => handleLoopSound()}
        />
      </View>
      <View style={styles.primaryControls}>
        <DiscardSoundButton onPress={() => handleDiscard()} />
        <PlayPauseButton
          isPlaying={isPlaying}
          onPress={() => handlePlayback()}
        />
        <ConfirmSoundButton onPress={toggleModal} />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Name Your Riff</Text>
            <TextInput
              value={recordingName}
              onChangeText={setRecordingName}
              style={styles.modalInput}
              multiline={false}
              placeholder="Type here"
              placeholderTextColor="rgba(0, 0, 0, 0.2)"
            />
            <View style={styles.buttonsContainer}>
              <ModalButton text="Cancel" onPress={toggleModal} />
              <ModalButton text="Save" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
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
    paddingLeft: 42,
    marginTop: 18,
    paddingRight: 42,
  },
  secondaryControls: {
    borderWidth: 6,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '84%',
    padding: 18,
    borderRadius: 12,
  },
  modalHeaderText: {
    fontSize: 18,
    fontFamily: FONT.family,
    marginBottom: 6,
  },
  modalInput: {
    borderWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 36,
    fontFamily: FONT.family,
    fontSize: 18,
    borderRadius: 12,
    height: 42,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  modalButton: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: FONT.family,
    fontSize: 18,
    color: COLOR.light,
  },
  buttonTextPressed: {
    color: COLOR.light,
  },
});

export default RecordingReview;
