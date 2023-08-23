import { RecordButton } from '@components/atoms/ActionButtons';
import TimeSignatureButton from '@components/record/TimeSignatureButton';
import TimesToLoop from '@components/record/TimesToLoop';
import { SIZE } from '@constants/theme';
import record from '@styles/record';
import { Audio } from 'expo-av';
// import { StorageAccessFramework } from 'expo-file-system';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

function RecordingSetup() {
  const [selectedButton, setSelectedButton] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getRecordingPermission = async () => {
      try {
        const permission = await Audio.requestPermissionsAsync();
        console.log('Recording permission Granted', permission.granted);
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

    getRecordingPermission();
    // getStoragePermission();
  }, []);

  const handleTimeSignatureButtonPress = (button) => {
    setSelectedButton(button);
  };

  const handleRecordButtonPress = async () => {
    try {
      router.push('/record/inProgress');
    } catch (e) {
      console.log('handleRecordButtonPress error', e);
    }
  };

  return (
    <View style={record.container}>
      <View>
        <View style={[styles.timeSignaturesRow, styles.mb]}>
          <TimeSignatureButton
            top={2}
            bottom={4}
            selected={selectedButton === '1'}
            onPress={() => handleTimeSignatureButtonPress('1')}
            isFirst
          />
          <TimeSignatureButton
            top={3}
            bottom={4}
            selected={selectedButton === '2'}
            onPress={() => handleTimeSignatureButtonPress('2')}
          />
        </View>
        <View style={styles.timeSignaturesRow}>
          <TimeSignatureButton
            top={6}
            bottom={8}
            selected={selectedButton === '3'}
            onPress={() => handleTimeSignatureButtonPress('3')}
            isFirst
          />
          <TimeSignatureButton
            top={4}
            bottom={4}
            selected={selectedButton === '4'}
            onPress={() => handleTimeSignatureButtonPress('4')}
          />
        </View>
      </View>
      <TimesToLoop />
      <RecordButton
        recording={false}
        onPress={() => handleRecordButtonPress()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  timeSignaturesRow: {
    flexDirection: 'row',
  },
  mb: {
    marginBottom: SIZE.lg,
  },
});

export default RecordingSetup;
