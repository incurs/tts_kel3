const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.json());

// Define your routes and Text-to-Speech logic here
const { TextToSpeechClient } = require("@google-cloud/text-to-speech");

const textToSpeechClient = new TextToSpeechClient();

app.post("/text-to-speech", async (req, res) => {
  const { text } = req.body;

  try {
    const [response] = await textToSpeechClient.synthesizeSpeech({
      input: { text },
      voice: { languageCode: "id-ID", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "LINEAR16" },
    });

    // Send the audio data as a response
    res.send(response.audioContent.toString("base64"));
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error - Check logs");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
