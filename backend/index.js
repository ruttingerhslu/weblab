const { run } = require("./db.js");
const app = require("./app.js");

const PORT = process.env.PORT || 8080;

run().then(() => {
  app.listen(PORT, () => {
    console.log(`\nServer running on http://localhost:${PORT}`);
  });
});
