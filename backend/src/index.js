require('dotenv').config();
require('./models/User');
require('./models/Business');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const userRoutes = require('./routes/userRoutes');
const scanRoutes = require('./routes/scanRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(businessRoutes);
app.use(userRoutes);
app.use(scanRoutes);

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
});