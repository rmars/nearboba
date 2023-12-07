const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const sdk = require("api")("@yelp-developers/v1.0#xtskmqwlofwyovu");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

sdk.auth(`Bearer ${process.env.YELP_API_KEY}`);

app.get("/api/boba", (req, res) => {
  const limit = req.query.limit || "20";
  const location = req.query.location || "";
  sdk
    .v3_business_search({
      location,
      radius: "10000", // 6 miles
      term: "boba", // TODO: add support for "bubble tea"
      sort_by: "best_match",
      limit,
    })
    .then(({ data }) => {
      res.setHeader("Content-Type", "application/json");
      res.send(data);
    })
    .catch(err => {
      console.error(err.data);
      res.setHeader("Content-Type", "application/json");
      res.status(err.status).send({ message: "API Error" });
    });
});

app.listen(3001, () => console.log("Express server started on localhost:3001"));
