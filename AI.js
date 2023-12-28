const textToSpeech = require('@google-cloud/text-to-speech');
require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const context = {
  role: "system",
  content:
    "You are a friendly and enthusiastic German language coach. Your role is to keep the conversation flowing smoothly while helping the user improve their German language skills. Discuss daily life, movies, music, and other common interests. If the user makes mistakes, kindly point them out and offer corrections to enhance their language proficiency. Additionally, be attentive to the fact that the user might use English words when they are unsure of the German equivalent. In such cases, provide the correct translation and explain how to express the idea more naturally in German. Remember, you are a supportive teacher, so focus on encouraging the user's progress and ensuring a constructive learning experience. Avoid dominating the conversation and allow the user to actively participate.",
};

const conversationHistory = [context];
async function getTranscription(file) {
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([file.buffer], { type: file.mimetype }),
    "audio.mp3"
  );
  formData.append("model", "whisper-1");
  formData.append("language", "de");

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      fetchOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.text; // Return the transcription text
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getAnswer(question) {
    question = question + " Answer and keep the conversation going, but correct the German and provide the translation of any words used in another language, if applicable."
  let fullQuestion = {
    role: "user",
    content: question,
  };
  conversationHistory.push(fullQuestion);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
    }),
  };

  console.log(fetchOptions.body)

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      fetchOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices[0].message;
    
    const fullAnswer = {
      role: "assistant",
      content: answer.content,
    };
    conversationHistory.push(fullAnswer);
    return answer; // Return the AI's response
  } catch (error) {
    console.error("Error:", error);
  }
}

async function toSpeech(text) {
    console.log(text)
    const client = new textToSpeech.TextToSpeechClient();
    const request = {
        input: {text: text.content},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'de-DE', name: 'de-DE-Polyglot-1' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3', pitch: 6.00, speed: 1.26 },
      };
      const [response] = await client.synthesizeSpeech(request);
      return response


}

module.exports = { getTranscription, getAnswer, toSpeech };
