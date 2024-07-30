const express = require('express');
const app = express();
const cors = require('cors');

const breathingRoutes = require('./routes/breathingRoutes');
const articleRoutes = require('./routes/articleRoutes');
app.use(cors());
app.use(express.json());

app.use('/api/breathing', breathingRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});