const express = require('express');
const app = express();
const materialRoutes = require('./routes/materialRoutes');

app.use(express.json());
app.use('/api', materialRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
