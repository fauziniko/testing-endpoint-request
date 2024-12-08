const express = require('express');
const testRoutes = require('./routes/testRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Routes
app.use('/test-api', testRoutes);

app.listen(PORT, () => {
    console.log(`API Tester running on http://localhost:${PORT}`);
});

module.exports = app;
