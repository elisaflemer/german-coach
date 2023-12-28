// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 5000;

// Set up storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getTranscription, getAnswer, toSpeech } = require("./AI.js");

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Endpoint for handling audio file uploads
app.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: "No audio file provided." });
    }

    let transcript = await getTranscription(audioFile);
    let answer = await getAnswer(transcript);
    let speech = await toSpeech(answer);
    const base64Audio = Buffer.from(speech.audioContent, 'binary').toString('base64');

    res.json({
      message: 'Audio file received successfully.',
      transcript: transcript,
      answer: answer,
      speech: {
        audioContent: base64Audio,
        audioEncoding: 'BASE64',
        // Add other relevant audio information here
      },
    });
  } catch (error) {
    console.error("Error handling audio file upload:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
