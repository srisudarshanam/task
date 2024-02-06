// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const bodyParser = require('body-parser');
const route = require ('./routes/routes.js');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3008;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// Middleware
app.use(express.json());

// Routes


app.use('/api', route);


// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
