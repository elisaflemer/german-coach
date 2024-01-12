const { getTranscription } = require("./services/transcriber");
const { getAnswer } = require("./services/answerer");
const { toSpeech } = require("./services/speaker");

async function transcribe(req, res) {
  try {
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: "No audio file provided." });
    }

    let transcription = await getTranscription(audioFile);

    res.json({
      transcription
    });
  } catch (error) {
    console.error("Error handling audio file upload:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

async function chat(req, res) {
  try {
    const question = req.body.question;
    if (!question) {
      return res.status(400).json({ error: "No question provided." });
    }

    let answer = await getAnswer(question);
    let audio = await toSpeech(answer)
    let audioInBase64 = audio.audioContent.toString('base64')

    res.json({
      text: answer.content,
      audio: audioInBase64
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { transcribe, chat,  };
