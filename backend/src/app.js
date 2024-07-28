const express = require('express');
const app = express();
const cors = require('cors');
const sessionRoutes = require('./routes/sessionRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

const breathingRoutes = require('./routes/breathingRoutes');
const articleRoutes = require('./routes/articleRoutes');
app.use(cors());
app.use(express.json());

app.use('/api/breathing', breathingRoutes);
app.use('/api/articles', articleRoutes);

const PORT = process.env.PORT || 8080;
app.use('/api/sessions', sessionRoutes);
app.use('/api/tokens', tokenRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});