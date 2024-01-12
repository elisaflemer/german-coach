// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { transcribe, chat } = require("./controller");

const app = express();
app.use(cors());
const port = 5000;

// Set up storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(express.json());

app.post("/transcribe", upload.single("audio"), transcribe);
app.post("/chat", chat);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
