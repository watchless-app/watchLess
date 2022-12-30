export default settings => {
  let js = '';
  const blockedURLs = [];

  if (settings?.hideSettings?.subscriptionFeed) {
    blockedURLs.push({
      url: 'youtube.com/feed/subscriptions',
      error: 'Subscription Feed is blocked.',
    });
  }

  if (settings?.hideSettings?.trendingPage) {
    blockedURLs.push({
      url: 'youtube.com/feed/explore',
      error: 'Trending page is blocked.',
    });
    blockedURLs.push({
      url: 'youtube.com/feed/trending',
      error: 'Trending page is blocked.',
    });
  }

  if (settings?.hideSettings?.shorts) {
    blockedURLs.push({
      url: 'youtube.com/shorts',
      error: 'Shorts are blocked.',
    });
  }

  const localSettings = {...settings, blockedURLs};

  //js Without Condition
  js += `
    if (typeof watchless_allSettings === 'undefined') {
      window['watchless_allSettings'] = '${JSON.stringify(localSettings)}';
    }
  `;

  if (settings?.advancedSettings?.customJS) {
    js += ' ' + settings?.advancedSettings?.customJS;
  }

  return js;
};
