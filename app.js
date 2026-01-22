// Ameed Halabi , Lotem Sharir

const express = require("express");
// const cors = require("cors");
const app = express();

const loginRoutes = require("./routes/login");
const homeRoutes = require("./routes/home");

app.use(express.json());
// app.use(cors());
app.use(express.static("FE"));

// Use routes with app.use
app.use("/login", loginRoutes);
app.use("/home", homeRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/FE/login.html");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
