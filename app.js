const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const defaultRoutes = require('./src/routes/defaultRoutes');


app.use(express.json());
app.use('/', defaultRoutes);
app.listen(3000, () => console.log(`Listening on port ${port}...`));
