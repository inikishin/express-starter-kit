var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Simple GET response');
});

router.get('/:name', (req, res, next) => {
  const name = req.params.name;
  res.send(`GET request with param ${name}`);
});

router.post('/', (req, res, next) => {
  const body = req.body;
  res.send(`POST request with body ${body}`);
})

module.exports = router;
