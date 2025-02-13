// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'periodic_table',
  port: 5432,
});

app.get('/api/data', async (req, res) => {
  const page = parseInt(req.query._page);
  const pageSize = parseInt(req.query._limit);
  try {
    const result = await pool.query("SELECT * FROM elements_elements LIMIT " + pageSize + " OFFSET " + page);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
