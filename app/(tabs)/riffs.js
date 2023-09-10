import { COLOR, FONT, SIZE } from '@constants/theme';
import { StorageAccessFramework as SAF } from 'expo-file-system';
import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, { Capability } from 'react-native-track-player';

const Riffs = () => {
  const [riffs, setRiffs] = useState([]);
  const [directoryUri, setDirectoryUri] = useState(null);

  // Get storage permissions
  useEffect(() => {
    const getStoragePermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const permission = await SAF.requestDirectoryPermissionsAsync();
          if (permission.granted) {
            setDirectoryUri(() => permission.directoryUri);
          }
        }
      } catch (error) {
        console.log('getStoragePermission error', error);
      }
      // TODO: handle permission rejection
    };

    getStoragePermission();
  }, []);

  // Setup TrackPlayer
  useEffect(() => {
    const setupTrackPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer({});
        await TrackPlayer.updateOptions({
          stopWithApp: true,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
            Capability.SeekTo,
          ],
          compactCapabilities: [Capability.Play, Capability.Pause],
        });
      } catch (error) {
        console.error('TrackPlayer setup error:', error);
      }
    };

    setupTrackPlayer();
  }, []);

  // Fetch riffs
  useEffect(() => {
    const fetchRiffs = async () => {
      try {
        if (!directoryUri) return;

        const assets = await SAF.readDirectoryAsync(directoryUri);
        const riffData = assets.map((file, index) => {
          const decodedFileUri = decodeURIComponent(file);
          const fileName = decodedFileUri
            .split('/')
            .pop()
            .split('.')
            .slice(0, -1)
            .join('.');

          return {
            id: index.toString(),
            url: file,
            fileName,
          };
        });

        setRiffs(riffData);
      } catch (error) {
        console.error('Fetch riffs error:', error);
      }
    };

    fetchRiffs();
  }, [directoryUri]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={[styles.listItem, index > 0 && styles.mt]}>
      <Text style={[styles.fileMeta, styles.fileName]}>{item.fileName}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.fileMeta}>4/4</Text>
        <Text style={styles.fileMeta}>2 bars</Text>
        <Text style={styles.fileMeta}>120 bpm</Text>
      </View>
    </TouchableOpacity>
  );

  // if (!riffs.length) {
  //   return (

  //   )
  // }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={riffs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
      />
    </View>
  );
};

export default Riffs;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    flex: 1,
    flexDirection: 'column',
  },
  flatlist: {
    alignSelf: 'stretch',
    marginLeft: SIZE.lg,
    marginRight: SIZE.lg,
  },
  mt: {
    marginTop: SIZE.md,
  },
  listItem: {
    alignItems: 'flex-start',
    backgroundColor: COLOR.accent,
    borderRadius: 9,
    borderColor: COLOR.tertiary,
    borderWidth: 2,
    paddingLeft: SIZE.lg,
    paddingRight: SIZE.lg,
    paddingTop: SIZE.sm,
    paddingBottom: SIZE.sm,
  },
  fileName: {
    borderWidth: 0,
    fontSize: 18,
    marginBottom: SIZE.sm,
    padding: 0,
    color: COLOR.light,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  fileMeta: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#00C559',
    color: '#00C559',
    fontFamily: FONT.family,
    fontSize: 12,
    padding: 6,
    textAlign: 'center',
  },
  duration: {
    fontSize: 18,
    color: COLOR.light,
  },
});
