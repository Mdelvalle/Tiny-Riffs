import { COLOR, FONT, SIZE } from '@constants/theme';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const TimesToLoop = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={[styles.multiplier, styles.divider]}>x1</Text>
      </Pressable>
      <Pressable>
        <Text style={[styles.multiplier, styles.divider]}>x2</Text>
      </Pressable>
      <Pressable>
        <Text style={[styles.multiplier, styles.divider]}>x3</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.multiplier}>x4</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: COLOR.light,
    justifyContent: 'space-evenly',
    width: 192,
  },
  divider: {
    borderColor: COLOR.light,
    borderRightWidth: 1,
    paddingRight: 9,
  },
  multiplier: {
    fontFamily: FONT.family,
    color: COLOR.light,
    fontSize: SIZE.lg,
  },
});

export default TimesToLoop;
