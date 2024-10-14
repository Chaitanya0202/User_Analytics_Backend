const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://cc5032949:chetan8197@chetan.nqm2rri.mongodb.net/analyticsDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Schema for storing the merged data
const dataSchema = new mongoose.Schema({
  browserInformation: {
    platform: String,
    userAgent: String,
    screenResolution: String,
    language: String,
  },
  ipv4Address: {
    ip: String,
  },
  ipv6Address: {
    ip: String,
  },
  locationInformation: {
    city: String,
    region: String,
    country: String,
    loc: String,
    postal: String,
    timezone: String,
  },
  localStorageData: [{
    key: String,
    value: String,
  }],
  sessionStorageData: [{
    key: String,
    value: String,
  }],
  cookiesData: [{
    key: String,
    value: String,
  }],
});

const DataModel = mongoose.model('AnalyticsData', dataSchema);

// API route to save data
app.post('/api/data/save', async (req, res) => {
  try {
    const data = new DataModel(req.body);
    await data.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
