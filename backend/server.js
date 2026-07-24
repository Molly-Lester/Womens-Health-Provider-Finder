const express = require('express');
const cors = require('cors');
const providerRoutes = require("./routes/providerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", providerRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
