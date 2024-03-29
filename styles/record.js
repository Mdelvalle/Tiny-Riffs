import { COLOR, SIZE } from '@constants/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: SIZE.lg,
  },
});

export default styles;
