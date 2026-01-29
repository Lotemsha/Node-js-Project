// Ameed Halabi , Lotem Sharir

const express = require("express");
const session = require("express-session");
const app = express();

const loginRoutes = require("./routes/login");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const logoutRoutes = require("./routes/logout");
const userRoutes = require("./routes/user");
const editRoutes = require("./routes/edit");
const trailsRoutes = require("./routes/trails");

app.use(express.json());
app.use(express.static("FE"));

// Session
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

// Use routes with app.use
app.use("/login", loginRoutes);
app.use("/home", homeRoutes);
app.use("/about", aboutRoutes);
app.use("/logout", logoutRoutes);
app.use("/home", userRoutes);
app.use("/edit", editRoutes);
app.use("/trails", trailsRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/FE/login.html");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
