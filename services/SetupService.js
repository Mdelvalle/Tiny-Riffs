import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
} from 'react-native-track-player';

export const DefaultRepeatMode = RepeatMode.Queue;
export const DefaultAudioServiceBehaviour =
  AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;

const setupPlayer = async (options) => {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer(options);
    } catch (error) {
      return error.code;
    }
  };
  while ((await setup()) === 'android_cannot_setup_player_in_background') {
    // A timeout will mostly only execute when the app is in the foreground,
    // and even if we were in the background still, it will reject the promise
    // and we'll try again:
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
};

export const SetupService = async () => {
  await setupPlayer({
    autoHandleInterruptions: true,
  });
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    android: {
      appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.SeekTo,
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
    ],
    progressUpdateEventInterval: 2,
  });
  await TrackPlayer.setRepeatMode(DefaultRepeatMode);
};

// const setupPlayer = () => {
//   return TrackPlayer.setupPlayer()
//     .then(() => {
//       return Promise.resolve();
//     })
//     .catch((err) => {
//       console.log('eerrr', err);
//       if (
//         err?.message?.includes(
//           'The player has already been initialized via setupPlayer',
//         )
//       ) {
//         return Promise.resolve();
//       }

//       return Promise.reject(err);
//     });
// };

// export const SetupService = async () => {
//   let isSetup = false;
//   try {
//     await TrackPlayer.getCurrentTrack();
//     isSetup = true;
//   } catch (error) {
//     console.log('setting up', error);

//     await TrackPlayer.setupPlayer();
//     await TrackPlayer.updateOptions({
//       stopWithApp: true,
//       android: {
//         appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
//       },
//       capabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.SkipToNext,
//         Capability.SkipToPrevious,
//         Capability.SeekTo,
//       ],
//       compactCapabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.SkipToNext,
//       ],
//       progressUpdateEventInterval: 2,
//     });
//     await TrackPlayer.setRepeatMode(DefaultRepeatMode);

//     isSetup = true;
//   } finally {
//     return isSetup;
//   }
// };
