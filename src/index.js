import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import userRouter from "./routes/user.js";
import articleRouter from "./routes/article.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/api/article", articleRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
