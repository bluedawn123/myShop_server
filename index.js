const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/board', boardRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
