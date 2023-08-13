const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config({ path: ".env" });

const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const compression = require("compression");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());
const corsOptions = {
  origin: "https://repliq-ecomm.onrender.com/",
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

app.use(express.static(path.join(__dirname, "./public"), { maxAge: 31536000 }));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/index.html"));
});

module.exports = app;
