const { initialisation } = require("./db/db.connect");
require("dotenv").config({ path: ".env" });
const questionRouter = require("./routes/questions.routes");

initialisation();

const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://messold-form-original.vercel.app",
    "https://form-frontend-sigma.vercel.app",
  ],
  credentials: true,
  openSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => res.send("Express started"));

app.use("/api/v1", questionRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
