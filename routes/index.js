var express = require('express');
var router = express.Router();

// GET /localhost:3000 
router.get('/', (req, res, next) => {
  res.json({ success: true });
});

module.exports = router;
