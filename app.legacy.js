const express = require ('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config()

const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
    res.send('okey')
})

app.listen(port, () => {
    console.log(`server listen ${port}`);
});