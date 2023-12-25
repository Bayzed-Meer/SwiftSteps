const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.mongoURL, { });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});