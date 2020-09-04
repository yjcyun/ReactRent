const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require("./app");

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`App listening on port ${port}`));