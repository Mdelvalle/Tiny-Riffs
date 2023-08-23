import { COLOR, FONT } from '@constants/theme';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

const buttonAnimation = ({ pressed }) => {
  return {
    opacity: pressed ? 0.6 : 1,
  };
};

export const RecordButton = ({ onPress, recording }) => {
  const recordingIconName = recording ? 'stop-circle' : 'record-circle';

  return (
    <Pressable style={buttonAnimation} onPress={onPress}>
      <MaterialCommunityIcons
        style={styles.buttonBackground}
        backgroundColor={COLOR.dark}
        name={recordingIconName}
        size={90}
        color={COLOR.light}
      />
    </Pressable>
  );
};

const ActionIconButton = ({ onPress, name, size, color }) => {
  return (
    <Pressable onPress={onPress} style={buttonAnimation}>
      <MaterialIcons
        style={styles.buttonBackground}
        backgroundColor={COLOR.dark}
        name={name}
        size={size}
        color={color || COLOR.light}
      />
    </Pressable>
  );
};

export const PlayPauseButton = ({ onPress, isPlaying }) => {
  const playPauseIconName = isPlaying
    ? 'pause-circle-filled'
    : 'play-circle-filled';

  return (
    <ActionIconButton name={playPauseIconName} size={90} onPress={onPress} />
  );
};

export const DiscardSoundButton = ({ onPress }) => {
  return <ActionIconButton name="cancel" size={60} onPress={onPress} />;
};

export const ConfirmSoundButton = ({ onPress }) => {
  return <ActionIconButton name={'check-circle'} size={60} onPress={onPress} />;
};

export const LoopSoundButton = ({ onPress, isLooping }) => {
  const color = isLooping ? COLOR.secondary : COLOR.light;

  return (
    <ActionIconButton name={'loop'} size={36} color={color} onPress={onPress} />
  );
};

const styles = StyleSheet.create({
  buttonBackground: {
    borderRadius: 50,
    fontFamily: FONT.family,
  },
});
