import express from "express";
import postsRoute from "./routes/posts.js"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();                      // Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ "_"+ file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.post("/api/userImage", upload.single("file"), function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filename = req.file.filename;
    return res.status(200).json({ filename });
  } catch (err) {
    console.error("Error uploading user image:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/api/posts",postsRoute);
app.use("/api/user",usersRoute);
app.use("/api/auth",authRoute);

// app.get("/test",(req,res)=>{
//     res.json("It works!")          Instead of having all routes in index file , we manage them using indiviually
// })

app.listen(8800,()=>{
    console.log("Connected!")
})