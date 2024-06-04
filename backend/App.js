const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const materialRoutes = require('./routes/materialRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', materialRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
