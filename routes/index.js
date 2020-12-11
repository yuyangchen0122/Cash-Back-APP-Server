const express = require('express');
// const actions = require();
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
})

module.exports = router;