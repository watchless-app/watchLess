import GoogleCast from 'react-native-google-cast';
import {Alert, ToastAndroid} from 'react-native';

import {getParameterByName} from '../utils/others';

const fetchYoutubeVideo = async url => {
  const resultRaw = await fetch(url);
  const result = await resultRaw.json();

  if (!result || !result.formatStreams) {
    console.log(result, url);
    throw new Error(
      'Could not find media source. Please try again later or change Invidious API Endpoint.',
    );
  }

  const lastStream = result.formatStreams[result.formatStreams.length - 1];

  if (lastStream) {
    return {mediaUrl: lastStream.url, videoData: result};
  } else {
    console.log(result, url);
    throw new Error(
      'Could not find media source. Please try again later or change Invidious API Endpoint. (2)',
    );
  }
};

export const castVideo = async (data, client, settings) => {
  try {
    const videoID = getParameterByName('v', data.url);

    const castState = await GoogleCast.getCastState();

    if (castState == 'connected') {
      const api = settings.advancedSettings.invidiousApi;
      const url = `${api}/api/v1/videos/${videoID}`;

      ToastAndroid.show('Casting video', ToastAndroid.SHORT);

      const {mediaUrl, videoData} = await fetchYoutubeVideo(url);

      console.log(mediaUrl);

      if (client) {
        await client.loadMedia({
          mediaInfo: {
            contentUrl: mediaUrl,
            contentId: videoID,
            metadata: {
              title: videoData.title,
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
