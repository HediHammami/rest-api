import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";
dotenv.config();

//Middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

//Connection
const server = http.createServer(app);
const port = 5000 || process.env.PORT;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/ `);
});

//DB connection
mongoose
  .connect(process.env.URL)
  .then(() => console.log("DB connected successfully"))
  .catch((error: Error) => console.log(error));

//Routes
app.use("/", router());
