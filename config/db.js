const mongoose = require("mongoose");
const connection = () => {
  return mongoose
    .connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database is Connected"))
    .catch((err) => console.log(err));
};

module.exports = connection;
