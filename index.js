const express = require ('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");

const {mongoURI, globalVariable} = require('./Config/defaultConfig')

dotenv.config();
app.use(express.json());


// connect to db

// mongoose.connect(process.env.DB_CONNECT,{ useNewUr1Parser: true},
//  () => console.log('connected to db')
// );

mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() =>{
    console.log('connection was successful')
  })
  .catch(err =>{
    console.log(err)
  })

const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null, "images")
  },
  filename:(req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({storage: storage });
app.post("/upload", upload.single("file"), (req,res) => {
  res.status(200).json("File has been uploaded")
})

app.use("/auth", authRoute);   
app.use("/users", userRoute);   
app.use("/posts", postRoute);   
app.use("/categories", categoryRoute);   

app.listen("5000",() =>{
    console.log('connected ')
})