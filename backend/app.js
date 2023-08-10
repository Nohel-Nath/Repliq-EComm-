const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config({ path: ".env" });

const cookieParser = require("cookie-parser");
const cors = require("cors");

const compression = require("compression");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(compression());

const useRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
app.use("/user", useRouter);
app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
