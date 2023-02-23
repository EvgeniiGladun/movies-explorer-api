const app = require('./app');
const { SERVER_OK } = require('./constants');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(SERVER_OK);
});
