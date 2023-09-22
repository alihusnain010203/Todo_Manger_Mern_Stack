const mongoose = require('mongoose');
const URL = "mongodb+srv://Alimalik:0322@todo.kckzp3d.mongodb.net/?retryWrites=true&w=majority"
const conn = async () => {
  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected");
  }
  catch (e) {
    console.log(e);
  }
}
conn();