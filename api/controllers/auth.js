import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");       // If data has length then, it indicate that user exist for the provided username

    //Hash the password and create a user                 // Else we allow user to create account and hash her/his password by bcrypt.js library
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const imgFileName = req.body.img.filename;

    const q = "INSERT INTO users(`username`,`email`,`password`,`img`) VALUES (?)";
    const values = [
      req.body.username, 
      req.body.email, 
      hash,
      imgFileName
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password          //By default, data returns an array. Data is generated from the query
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");      // id: data[0].id Here we are assging the id of user to identity it   
    const { password, ...other } = data[0];                     // jwtkey is our secret key and we can create random key and store it in .env file

    res
      .cookie("access_token", token, {      //before using cookies we need to i cookies-parser library and need to add it in index.js as middleware
        httpOnly: true,           // it means that any user script and browser can't access this cookie directly. Its is accessible only when we request API
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true                 //some configuration
  }).status(200).json("User has been logged out.")
};