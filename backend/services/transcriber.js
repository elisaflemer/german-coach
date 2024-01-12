require ("dotenv").config();
const openaiApiKey = process.env.OPENAI_API_KEY;

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
  
      return data.text; 
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  module.exports = { getTranscription };