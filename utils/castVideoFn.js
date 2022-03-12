import GoogleCast from 'react-native-google-cast';
import {Alert, ToastAndroid} from 'react-native';
import ytdl from 'react-native-ytdl';

export const castVideo = async (data, client, settings) => {
  try {
    const castState = await GoogleCast.getCastState();

    if (castState == 'connected') {
      ToastAndroid.show('Casting video', ToastAndroid.SHORT);

      const videoData = await ytdl.getBasicInfo(data.url);
      const mediaUrls = await ytdl(data.url, {quality: 'highest'});

      if (client) {
        await client.loadMedia({
          mediaInfo: {
            contentUrl: mediaUrls[0].url,
            contentId: videoData?.videoDetails?.videoId,
            metadata: {
              title: videoData?.videoDetails?.title,
            },
          },
        });

        GoogleCast.showExpandedControls();
      }
    }
  } catch (e) {
    Alert.alert(e.name, e.message);
  }
};
