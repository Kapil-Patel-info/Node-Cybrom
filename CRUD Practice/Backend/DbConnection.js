const mongoose = require("mongoose");
require('dotenv').config();

function ConnectDB() {
  main().catch((err) => console.log(err));

  async function main() {
    await mongoose.connect();
  }
}

module.exports = ConnectDB;
