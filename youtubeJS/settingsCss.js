export default settings => {
  const {hideSettings} = settings;

  let css = '';

  if (hideSettings?.startPage) {
    css += `
            div[tab-identifier='FEwhat_to_watch'] {
                display: none;
            }
        `;
  }

  if (hideSettings?.shortsTab) {
    css += `
            ytm-pivot-bar-renderer ytm-pivot-bar-item-renderer:nth-child(2) {
                display: none;
            }
        `;
  }

  if (hideSettings?.recommended) {
    css += `
            ytm-item-section-renderer[data-content-type='related'] {
                display: none;
            }
        `;
  }

  if (hideSettings?.likeButton) {
    css += `
            .slim-video-action-bar-actions c3-material-button:nth-child(1),
            .slim-video-action-bar-actions c3-material-button:nth-child(2){
                display: none;
            }
        `;
  }

  if (hideSettings?.likeCount) {
    css += `
            .slim-video-action-bar-actions c3-material-button:nth-child(1) div.button-renderer-text {
                display: none;
            }

            ytm-video-description-header-renderer .factoids ytm-sentiment-factoid-renderer:nth-child(1){
                display: none;
            }

            shorts-video ytm-like-button-renderer div.button-renderer-text {
                display: none;
            }

            ytm-comment-renderer div.comment-icons:first-of-type span.comment-count {
                visibility: hidden;
            }
        `;
  }

  if (hideSettings?.views) {
    css += `
            /* On Video Page */
            .slim-video-information-title-and-badges span.secondary-text {
                display: none;
            }

            ytm-video-description-header-renderer .factoids ytm-factoid-renderer:nth-child(2){
                display: none;
            }

            /* In Search results */
            ytm-compact-video-renderer a.compact-media-item-metadata-content div.subhead div:nth-last-child(2){
                display: none;
            }

            /* In Sub feed */
            ytm-video-with-context-renderer div.details ytm-badge-and-byline-renderer span.ytm-badge-and-byline-item-byline.small-text:nth-child(3),
            ytm-video-with-context-renderer div.details ytm-badge-and-byline-renderer span.ytm-badge-and-byline-separator:nth-child(2)
            {
                display: none;
            }

            /* Channel Sub count */
            ytm-channel-about-metadata-renderer div p:nth-child(3){
                display: none;
            }
        `;
  }

  if (hideSettings?.comments) {
    css += `
            ytm-comments-entry-point-header-renderer {
                display: none;
            }
        `;
  }

  if (hideSettings?.commentCount) {
    css += `
            ytm-comments-entry-point-header-renderer span.formatted-string-text:first-of-type {
                color: transparent;
            }

            shorts-video div.reel-player-overlay-actions c3-material-button:first-of-type div.button-renderer-text {
                display: none;
            }
        `;
  }

  if (hideSettings?.subscriberCount) {
    css += `
            .slim-owner-bylines div.subhead {
                display: none;
            }

            .c4-tabbed-header-subscibe.cbox span.c4-tabbed-header-subscriber-count.secondary-text {
                display: none;
            }

            ytm-compact-channel-renderer a.compact-media-item-metadata-content div.subhead div:nth-child(2){
                display: none;
            }
        `;
  }

  if (hideSettings?.subscriptionFeed) {
    css += `
            ytm-pivot-bar-renderer ytm-pivot-bar-item-renderer:nth-last-child(2) {
                display: none;
            }
        `;
  }

  if (settings?.advancedSettings?.customCSS) {
    css += settings?.advancedSettings?.customCSS;
  }

  //Css Without Condition
  css += `
    `;

  return css;
};
