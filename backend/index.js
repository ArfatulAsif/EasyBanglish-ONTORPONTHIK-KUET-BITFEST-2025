const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: "./.env" });


app.listen(8000, () => {
  console.log("server is running");
});

app.use("/auth", require("./routes/auth"));
app.use("/ai", require("./routes/ai"));
app.use("/pay", require("./routes/payment"));
app.use("/chat",require("./routes/chat"));
app.use("/pdf",require("./routes/pdf"));