import GoogleCast from 'react-native-google-cast';
import {Alert} from 'react-native';

const fetchYoutubeVideo = async url => {
  const resultRaw = await fetch(url);
  const result = await resultRaw.json();

  const lastStream = result.formatStreams[result.formatStreams.length - 1];

  if (lastStream) {
    return {mediaUrl: lastStream.url, videoData: result};
  }
};

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const castVideo = async (data, client, settings) => {
  const videoID = getParameterByName('v', data.url);

  const castState = await GoogleCast.getCastState();

  if (castState == 'connected') {
    const api = settings.advancedSettings.invidiousApi;
    const url = `${api}/api/v1/videos/${videoID}`;

    const {mediaUrl, videoData} = await fetchYoutubeVideo(url);

    console.log(mediaUrl);

    if (client) {
      client
        .loadMedia({
          mediaInfo: {
            contentUrl: mediaUrl,
            contentId: videoID,
            metadata: {
              title: videoData.title,
            },
          },
        })
        .then(() => {
          GoogleCast.showExpandedControls();
        })
        .catch(() => {
          Alert.alert('Cast faild', 'could not load media');
        });
    }
  } else {
    // Do nothing
  }
};
