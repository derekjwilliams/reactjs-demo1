// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

// database-dms.c1oqwsaqc09s.us-east-2.rds.amazonaws.com
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'periodic_table',
  port: 5432,
});

app.get('/api/data', async (req, res) => {
  const limit=parseInt(req.query['limit']);
  const offset=parseInt(req.query['offset']);
  const search=(req.query['search']);
  try {
    let result;

    if (search) {
      result = await pool.query(`SELECT * FROM elements_elements WHERE element ILIKE '%${search}%'`);
    } else {
      result = await pool.query(`SELECT * FROM elements_elements LIMIT ${limit} OFFSET ${offset}`);
    }

    res.json(result.rows);

  } catch (err) {

    console.error(err.message);

    res.status(500).send('Server Error');

  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
