const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config()
async function toSpeech(text) {
    console.log(text)
    const client = new textToSpeech.TextToSpeechClient();
    const request = {
        input: {text: text.content},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'de-DE', name: 'de-DE-Neural2-B' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3', pitch: 6.00, speed: 1.5 },
      };
      const [response] = await client.synthesizeSpeech(request);
      return response
}

module.exports = { toSpeech };