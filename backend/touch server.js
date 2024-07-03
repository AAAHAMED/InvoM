const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'your-hostinger-db-host',
  user: 'your-db-username',
  password: 'your-db-password',
  database: 'your-database-name'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// API endpoint to handle image data upload
app.post('/upload', (req, res) => {
  const { imageId, type, company, date, image } = req.body;

  const query = 'INSERT INTO images (imageId, type, company, date, image) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [imageId, type, company, new Date(date), image], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to save data' });
      return;
    }
    res.status(200).json({ message: 'Data saved successfully' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
