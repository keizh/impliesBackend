require("dotenv").config();
const mongoose = require("mongoose");

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log(`MONGO DB connection has been established`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = dbConnect;
