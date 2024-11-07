// getting-started.js
const mongoose = require("mongoose");

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MiniWhatsapp");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//schemas
chatSchema = mongoose.Schema({
  from: String,
  message: String,
  to: String,
  created_at: Date,
});

//model

let chats = mongoose.model("chat", chatSchema);

module.exports = mongoose.model("Chat", chatSchema);
