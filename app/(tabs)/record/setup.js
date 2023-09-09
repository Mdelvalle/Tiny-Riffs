import { RecordButton } from '@components/atoms/ActionButtons';
import { SIZE } from '@constants/theme';
import record from '@styles/record';
import { Audio } from 'expo-av';
// import { StorageAccessFramework } from 'expo-file-system';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

function RecordingSetup() {
  const router = useRouter();

  useEffect(() => {
    const getRecordingPermission = async () => {
      try {
        const permission = await Audio.requestPermissionsAsync();
      } catch (error) {
        console.log('getRecordingPermission error', error);
      }
    };

    // const getStoragePermission = async () => {
    //   try {
    //     const permission =
    //       await StorageAccessFramework.requestDirectoryPermissionsAsync();
    //     console.log('Storage permission Granted', permission.granted);
    //   } catch (error) {
    //     console.log('getStoragePermission error', error);
    //   }
    // };
    // getStoragePermission();

    getRecordingPermission();
  }, []);

  const handleRecordButtonPress = async () => {
    try {
      router.push('/record/inProgress');
    } catch (e) {
      console.log('handleRecordButtonPress error', e);
    }
  };

  return (
    <View style={[record.container, styles.container]}>
      <RecordButton
        recording={false}
        onPress={() => handleRecordButtonPress()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  timeSignaturesRow: {
    flexDirection: 'row',
  },
  mb: {
    marginBottom: SIZE.lg,
  },
});

export default RecordingSetup;
