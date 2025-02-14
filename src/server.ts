// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg

const app: express.Application = express();
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
const limit = parseInt(typeof req.query.limit === 'string' ? req.query.limit : '10');
  const offset = parseInt(typeof req.query.offset === 'string' ? req.query.offset : '0');
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;
  try {
    let result;

    if (search) {
      result = await pool.query(`SELECT * FROM elements_elements WHERE element ILIKE '%${search}%'`);
    } else {
      result = await pool.query(`SELECT * FROM elements_elements LIMIT ${limit} OFFSET ${offset}`);
    }

    res.json(result.rows);

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error(errorMessage);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
