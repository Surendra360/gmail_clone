const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0/nodemail")
  .then(() => {
    console.log("connn");
  })
  .catch((e) => {
    console.log(e);
  });
