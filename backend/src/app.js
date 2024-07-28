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


/*
Session Routes

POST /api/sessions/create - Create a new session
PUT /api/sessions/edit - Edit an existing session

Token Routes

POST /api/tokens/generate - Generate a new token for a session
Breathing Routes

GET /api/breathing/list - Get a list of breathing exercises (with pagination and search functionality)
POST /api/breathing/create - Create a new breathing exercise
PUT /api/breathing/update - Update an existing breathing exercise
Article Routes

GET /api/articles/list - Get a list of articles (with pagination and search functionality)
POST /api/articles/create - Create a new article
PUT /api/articles/update - Update an existing article
 */