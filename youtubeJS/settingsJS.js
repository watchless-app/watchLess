export default settings => {
  let js = '';

  //js Without Condition
  js += `
    if (typeof AFV_allSettings === 'undefined') {
      var AFV_allSettings = '${JSON.stringify(settings)}';
    }
    `;

  if (settings?.advancedSettings?.customJS) {
    js += ' ' + settings?.advancedSettings?.customJS;
  }

  //Disable Autoplay
  if (settings?.advancedSettings?.noautoplay) {
    js += ` 
    if (typeof AFV_disableAutoplay === 'undefined') {
      var AFV_disableAutoplay = true;
    } 
    `;
  }

  return js;
};
