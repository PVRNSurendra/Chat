const express = require("express");
const app = express();
const chats = require("../models/mongo"); // Assuming this is your mongoose model
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Read operations
app.get("/chats", async (req, res) => {
  try {
    let allchats = await chats.find(); // Fetch all chats from the database
    res.render("home.ejs", { allchats }); // Render the home view with all chats
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching chats from the database.");
  }
});

// Render new chat form
app.get("/chats/new", (req, res) => {
  res.render("form.ejs"); // Render the form view to add a new chat
});

// Create a new chat
app.post("/chats", async (req, res) => {
  try {
    console.log(req.body); // Log the incoming data for debugging

    let { from, message, to } = req.body;

    // Create a new chat entry
    const newChat = new chats({
      from,
      message, // Ensure you're using the correct variable name
      to,
    });

    // Save the new chat to the database
    await newChat.save(); // Save using save() instead of insertMany()

    res.redirect("/chats"); // Redirect to the chats page after saving
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the chat.");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
