import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"

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

//
// Define a model here.
const User = mongoose.model("User", {
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, min: [8, "to few"], max: 12 }
})
//

// Example root endpoint to get started with
app.get("/", (req, res) => {
  const password = "supersecretpassword"
  const hash = bcrypt.hashSync(password)

  // bcrypt.compareSync("supersecretpassword", hash) // true
  // bcrypt.compareSync("incorrectpassword", hash) // false

  res.send(`Signup form api. Here's an example of an encrypted password: ${hash}`)
})

// Add more endpoints here!

app.post("/users", (req, res) => {
  const jsonBody = req.body
  const user = new User(jsonBody)
  user.password = bcrypt.hashSync(user.password)
  console.log(user.password)
  console.log(user)

  user.save().then(() => {
    res.status(201).json({ created: true})
  }).catch(err => {
    res.status(400).json({ created: false, errorMsg: err.message})
  })
})



app.listen(8082, () => console.log("Products API listening on port 8082!"))
