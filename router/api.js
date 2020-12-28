const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.post('/send', (req, res) => {
  const timeStamp = new Date.now().toString();
  const serviceId = process.env.SERVICE_ID;
  const StringtoSign = `POST https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages\nContent-Type: application/json; charset=utf-8\n${timeStamp}`;
  const signature = crypto.createHmac('sha256');
});

module.exports = router;
