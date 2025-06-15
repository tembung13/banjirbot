const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const firebaseUrl = "https://banjir-5550a-default-rtdb.asia-southeast1.firebasedatabase.app/"; 

app.post("/webhook", async (req, res) => {
  const message = req.body.message;

  if (message && message.chat && message.chat.id) {
    const chatId = message.chat.id;
    const name = message.from.first_name || "User";

    try {
      await axios.put(`${firebaseUrl}/chat_ids/${chatId}.json`, {
        chat_id: chatId,
        name: name,
      });
      console.log("Chat ID saved:", chatId);
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
