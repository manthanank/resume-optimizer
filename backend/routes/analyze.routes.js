const express = require('express');
const multer = require('multer');
const { analyze } = require('../controllers/analyze.controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post(
  '/analyze',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'jobDesc', maxCount: 1 },
  ]),
  analyze
);

module.exports = router;
