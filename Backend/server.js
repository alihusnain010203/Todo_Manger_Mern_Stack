// server.js
const express = require('express');
const auth = require('./routes/authentication.js');
const crud_list = require('./routes/crud_list.js');
const cors = require('cors');
require('./connection/connect.js');
const app = express();
// Middleware

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send("Heloo");
})
// rRoutes
app.use(auth);
app.use(crud_list)
app.listen(3300, () => {
  console.log(`Server is running`);
});
