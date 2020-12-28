const express = require('express');
const axios = require('axios');
const router = express.Router();
const crypto = require('crypto');

router.post('/send', (req, res) => {
  const timeStamp = Date.now().toString();
  const serviceId = process.env.SERVICE_ID;
  const accessKey = process.env.ACCESS_KEY_ID;
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
  const StringtoSign = `POST ${url}\n${timeStamp}\n${accessKey}`;
  const signature = crypto.createHmac('sha256', StringtoSign);

  const headers = {
    'Contenc-type': 'application/json; charset=utf-8',
    'x-ncp-iam-access-key': accessKey,
    'x-ncp-apigw-timestamp': timeStamp,
    'x-ncp-apigw-signature-v2': signature,
  };
  const data = {
    type: 'SMS',
    countryCode: '82',
    from: '01023250564',
    content: `안녕하세요`,
    messages: [
      {
        to: `01023250564`,
        subject: 'abcd',
        content: 'abcd',
      },
    ],
  };
  axios.defaults.headers.post = null;
  axios
    .post(url, data, { headers })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

module.exports = router;
