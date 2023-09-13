import { COLOR, FONT, SIZE } from '@constants/theme';
import { SetupService } from '@services';
import { StorageAccessFramework as SAF } from 'expo-file-system';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, { State } from 'react-native-track-player';

const Riffs = () => {
  const [riffs, setRiffs] = useState([]);
  const [directoryUri, setDirectoryUri] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

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

  // Start TrackPlayer setup service
  useEffect(() => {
    const setup = async () => {
      try {
        await SetupService();
        setIsPlayerReady(() => true);
      } catch (error) {
        console.log('Error setting up TrackPlayer service', error);
      }
    };

    setup();
  }, []);

  // Fetch riffs
  useEffect(() => {
    const fetchRiffs = async () => {
      try {
        if (!directoryUri) return;

        const assets = await SAF.readDirectoryAsync(directoryUri);
        const riffData = assets
          // Don't include files in the trash
          .filter((file) => !file.includes('.trashed'))
          .map((file, index) => {
            const decodedFileUri = decodeURIComponent(file);
            const fileName = decodedFileUri
              .split('/')
              .pop()
              .split('.')
              .slice(0, -1)
              .join('.');

            return {
              id: `${fileName}-${index.toString()}`,
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

  const handleTrackPlayback = async ({ id, url, fileName }) => {
    try {
      const currentState = await TrackPlayer.getState();

      if (currentState === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.reset();
        await TrackPlayer.add({
          id,
          url,
          title: fileName,
          artist: '',
        });
        await TrackPlayer.play();
      }
    } catch (error) {
      console.log('Error playing track:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.listItem, index > 0 && styles.mt]}
      onPress={() => handleTrackPlayback(item)}>
      <Text style={[styles.fileMeta, styles.fileName]}>{item.fileName}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.fileMeta}>4/4</Text>
        <Text style={styles.fileMeta}>2 bars</Text>
        <Text style={styles.fileMeta}>120 bpm</Text>
      </View>
    </TouchableOpacity>
  );

  // Loading animation
  if (!directoryUri || !isPlayerReady || !riffs) {
    return <ActivityIndicator />;
  }

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
