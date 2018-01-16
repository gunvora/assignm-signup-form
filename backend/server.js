import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"
import uuid from "uuid/v4"

// Express setup, including JSON body parsing.
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Tells express to add the "Access-Control-Allow-Origin" header to allow requests from anywhere.
app.use(cors())

// Connect to MongoDB, on the "products-api" database. If the db doesn't
// exist, mongo will create it.
mongoose.connect("mongodb://localhost/signup-form-api", { useMongoClient: true })

// This makes mongo use ES6 promises, instead of its own implementation
mongoose.Promise = Promise

// Log when mongo connects, or encounters errors when trying to connect.
mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))

const User = mongoose.model("User", {
  username: {
    type: String,
    unique: true
  },
  password: String,
  accessToken: {
    type: String,
    default: () => uuid()
  }
})

// Example root endpoint to get started with
app.get("/", (req, res) => {
  const password = "supersecretpassword"
  const hash = bcrypt.hashSync(password)

  // bcrypt.compareSync(req.body.password, user.password) // true
  // bcrypt.compareSync("incorrectpassword", hash) // false

  res.send(`Signup form api. Here's an example of an encrypted password: ${hash}`)
})

app.post("/users", (req, res) => {
  const { username } = req.body
  const password = bcrypt.hashSync(req.body.password)
  const user = new User({ username, password })

  user.save()
    .then(() => res.status(201).json(user))
    .catch(err => res.status(400).json(err))
})

app.post("/login", (req, res) => {
  // 1. Find the user -
  // 2. Check if the user existed? -
  // 3. Check if the password matched? -
  User.findOne({ username: req.body.username })
    .then(user => {
      console.log(user)
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json(user)
      } else {
        // res.status(401).send("Unauthenticated")
        res.status(401).json({
          errors: {
            username: "Username is invalid"
          }
        })
      }
    })
})

// Add more endpoints here!

app.listen(8080, () => console.log("Products API listening on port 8080!"))
