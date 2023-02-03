const express = require('express');
const app = express();
const PORT = 5432;
const defaultRoutes = require('./src/routes/defaultRoutes');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));    //body parser deprecated
app.use('/', defaultRoutes);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});