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

  if (hideSettings?.trendingPage) {
    css += `
            ytm-pivot-bar-renderer[role="tablist"] ytm-pivot-bar-item-renderer:nth-child(2){
                display: none;
            }
        
            div[tab-identifier="FEtrending"] {
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
            .slim-video-metadata-actions c3-material-button:nth-child(1),
            .slim-video-metadata-actions c3-material-button:nth-child(2){
                display: none;
            }
        `;
  }

  if (hideSettings?.likeCount) {
    css += `
            .slim-video-metadata-actions c3-material-button:nth-child(1) div.button-renderer-text,
            .slim-video-metadata-actions c3-material-button:nth-child(2) div.button-renderer-text {
                display: none;
            }
        `;
  }

  if (hideSettings?.views) {
    css += `
            .slim-video-metadata-title-and-badges div {
                display: none;
            }

            ytm-compact-video-renderer a.compact-media-item-metadata-content div.subhead div:nth-last-child(2){
                display: none;
            }

            ytm-video-with-context-renderer div.details ytm-badge-and-byline-renderer span.ytm-badge-and-byline-item-byline.small-text:nth-child(3),
            ytm-video-with-context-renderer div.details ytm-badge-and-byline-renderer span.ytm-badge-and-byline-separator:nth-child(2)
            {
                display: none;
            }

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
                color: white;
                margin-bottom: -15px;
            }

            /*ytm-comments-entry-point-header-renderer span.formatted-string-text:first-of-type strong::before {
                content: "Comments";
                display: block;
                position: relative;
                color: black;
            }*/
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
            div[tab-identifier="FEsubscriptions"] {
                display: none;
            }

            div.pivot-bar-item-tab.pivot-subs {
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
