const express = require('express');
const app = express();
const sessionRoutes = require('./routes/sessionRoutes');
const tokenRoutes = require('./routes/tokenRoutes');

app.use(express.json());

app.use('/api/sessions', sessionRoutes);
app.use('/api/tokens', tokenRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});