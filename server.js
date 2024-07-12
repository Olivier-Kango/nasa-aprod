const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Autoriser toutes les origines

const API_KEY = 'DEMO_KEY';
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod'; // Utiliser HTTPS

app.get('/apod', async (req, res) => {
  try {
    const { startDate, endDate, count, date } = req.query;
    let url = `${NASA_API_URL}?api_key=${API_KEY}`;

    if (date) {
      url += `&date=${date}`;
    } else {
      if (startDate) url += `&start_date=${startDate}`;
      if (endDate) url += `&end_date=${endDate}`;
      if (count) url += `&count=${count}`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
